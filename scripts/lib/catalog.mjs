import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const SCHEMA_VERSION = "0.1.0";

const ENTITY_ID_PATTERN = /^[a-z0-9][a-z0-9._:/-]{2,255}$/;
const LOCAL_ID_PATTERN = /^[a-z0-9][a-z0-9._:-]{2,127}$/;
const PREDICATE_PATTERN = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/;
const CLAIM_STATUSES = new Set([
  "asserted",
  "verified",
  "disputed",
  "stale",
  "withdrawn",
  "unknown"
]);
const CLAIM_METHODS = new Set([
  "publisher_statement",
  "deterministic_extraction",
  "ai_extraction",
  "human_review",
  "computed_inference"
]);
const SOURCE_TYPES = new Set(["primary", "secondary", "tertiary", "community", "system"]);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function issue(file, location, message) {
  return `${file}:${location}: ${message}`;
}

function isDateTime(value) {
  return typeof value === "string" && value.includes("T") && Number.isFinite(Date.parse(value));
}

function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T00:00:00Z`));
}

function isHttpsUrl(value) {
  if (typeof value !== "string") return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export async function readJson(file) {
  const text = await readFile(file, "utf8");
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${file}: invalid JSON: ${error.message}`);
  }
}

export async function findJsonFiles(directory) {
  const files = [];
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return files;
    throw error;
  }

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await findJsonFiles(target));
    if (entry.isFile() && entry.name.endsWith(".json")) files.push(target);
  }
  return files;
}

export function validateReference(reference, file = "<memory>", location = "reference") {
  const errors = [];
  if (!isObject(reference)) return [issue(file, location, "must be an object")];

  if (!LOCAL_ID_PATTERN.test(reference.id ?? "")) {
    errors.push(issue(file, `${location}.id`, "must be a stable lowercase identifier"));
  }
  if (!SOURCE_TYPES.has(reference.source_type)) {
    errors.push(issue(file, `${location}.source_type`, "must be a supported source type"));
  }
  if (!isObject(reference.locator) || !isHttpsUrl(reference.locator.url)) {
    errors.push(issue(file, `${location}.locator.url`, "must be an HTTPS URL"));
  }
  if (!isObject(reference.publisher) || typeof reference.publisher.name !== "string" || reference.publisher.name.trim() === "") {
    errors.push(issue(file, `${location}.publisher.name`, "must identify the publisher"));
  }
  if (!isDateTime(reference.retrieved_at)) {
    errors.push(issue(file, `${location}.retrieved_at`, "must be an ISO 8601 date-time"));
  }
  if (reference.published_at !== undefined && !isDateTime(reference.published_at)) {
    errors.push(issue(file, `${location}.published_at`, "must be an ISO 8601 date-time"));
  }
  return errors;
}

export function validateClaim(claim, entityId, file = "<memory>", index = 0) {
  const location = `claims[${index}]`;
  const errors = [];
  if (!isObject(claim)) return [issue(file, location, "must be an object")];

  if (!LOCAL_ID_PATTERN.test(claim.id ?? "")) {
    errors.push(issue(file, `${location}.id`, "must be a stable lowercase identifier"));
  }
  if (claim.subject_id !== entityId) {
    errors.push(issue(file, `${location}.subject_id`, "must equal the containing entity id"));
  }
  if (!PREDICATE_PATTERN.test(claim.predicate ?? "")) {
    errors.push(issue(file, `${location}.predicate`, "must be a lowercase dotted property path"));
  }
  if (!("value" in claim)) {
    errors.push(issue(file, `${location}.value`, "is required"));
  }
  if (!CLAIM_STATUSES.has(claim.status)) {
    errors.push(issue(file, `${location}.status`, "must be a supported claim state"));
  }
  if (!CLAIM_METHODS.has(claim.method)) {
    errors.push(issue(file, `${location}.method`, "must be a supported evidence method"));
  }
  if (!isDateTime(claim.observed_at)) {
    errors.push(issue(file, `${location}.observed_at`, "must be an ISO 8601 date-time"));
  }
  if (claim.valid_from !== undefined && !isDateTime(claim.valid_from)) {
    errors.push(issue(file, `${location}.valid_from`, "must be an ISO 8601 date-time"));
  }
  if (claim.valid_until !== undefined && !isDateTime(claim.valid_until)) {
    errors.push(issue(file, `${location}.valid_until`, "must be an ISO 8601 date-time"));
  }
  if (isDateTime(claim.valid_from) && isDateTime(claim.valid_until) && Date.parse(claim.valid_until) < Date.parse(claim.valid_from)) {
    errors.push(issue(file, location, "valid_until cannot be earlier than valid_from"));
  }
  if (claim.status === "unknown" && claim.value !== null) {
    errors.push(issue(file, `${location}.value`, "must be null when status is unknown"));
  }
  if ((claim.method === "ai_extraction" || claim.method === "computed_inference") &&
      !(typeof claim.confidence === "number" && claim.confidence >= 0 && claim.confidence <= 1)) {
    errors.push(issue(file, `${location}.confidence`, "is required between 0 and 1 for AI extraction or inference"));
  }
  if (!Array.isArray(claim.references) || claim.references.length === 0) {
    errors.push(issue(file, `${location}.references`, "must contain at least one inspectable reference"));
  } else {
    const referenceIds = new Set();
    claim.references.forEach((reference, referenceIndex) => {
      errors.push(...validateReference(reference, file, `${location}.references[${referenceIndex}]`));
      if (referenceIds.has(reference.id)) {
        errors.push(issue(file, `${location}.references[${referenceIndex}].id`, "duplicates another reference id in the claim"));
      }
      referenceIds.add(reference.id);
    });
  }
  return errors;
}

export function validateEntity(entity, file = "<memory>") {
  const errors = [];
  if (!isObject(entity)) return [issue(file, "$", "entity must be an object")];

  if (entity.schema_version !== SCHEMA_VERSION) {
    errors.push(issue(file, "schema_version", `must equal ${SCHEMA_VERSION}`));
  }
  if (!ENTITY_ID_PATTERN.test(entity.id ?? "")) {
    errors.push(issue(file, "id", "must be a stable lowercase entity identifier"));
  }
  if (!PREDICATE_PATTERN.test(entity.type ?? "")) {
    errors.push(issue(file, "type", "must be a lowercase dotted type"));
  }
  if (!isObject(entity.labels) || Object.keys(entity.labels).length === 0) {
    errors.push(issue(file, "labels", "must contain at least one localized label"));
  } else {
    for (const [language, label] of Object.entries(entity.labels)) {
      if (!/^[a-z]{2,3}(-[A-Z]{2})?$/.test(language) || typeof label !== "string" || label.trim() === "") {
        errors.push(issue(file, `labels.${language}`, "must contain a non-empty label under a valid language tag"));
      }
    }
  }
  if (!isHttpsUrl(entity.canonical_uri)) {
    errors.push(issue(file, "canonical_uri", "must be an HTTPS URL"));
  }
  if (!Array.isArray(entity.claims)) {
    errors.push(issue(file, "claims", "must be an array"));
  } else {
    const claimIds = new Set();
    entity.claims.forEach((claim, index) => {
      errors.push(...validateClaim(claim, entity.id, file, index));
      if (claimIds.has(claim.id)) {
        errors.push(issue(file, `claims[${index}].id`, "duplicates another claim id in the entity"));
      }
      claimIds.add(claim.id);
    });
  }
  return errors;
}

export function validateNode(node, file = "<memory>") {
  const errors = [];
  if (!isObject(node)) return [issue(file, "$", "node must be an object")];
  if (node.schema_version !== SCHEMA_VERSION) errors.push(issue(file, "schema_version", `must equal ${SCHEMA_VERSION}`));
  if (!ENTITY_ID_PATTERN.test(node.node_id ?? "")) errors.push(issue(file, "node_id", "must be a stable lowercase node identifier"));
  if (!new Set(["proposed", "active", "paused", "deprecated", "withdrawn"]).has(node.status)) {
    errors.push(issue(file, "status", "must be a supported node state"));
  }
  if (!isObject(node.labels) || Object.keys(node.labels).length === 0) errors.push(issue(file, "labels", "must contain at least one label"));
  if (!Array.isArray(node.maintainers) || node.maintainers.length === 0 || node.maintainers.some((item) => !isObject(item) || !item.name)) {
    errors.push(issue(file, "maintainers", "must identify at least one maintainer"));
  }
  if (typeof node.license !== "string" || node.license.trim() === "") errors.push(issue(file, "license", "must state a license or explicit undecided status"));
  for (const field of ["catalog_url", "changes_url"]) {
    if (node[field] !== undefined && !isHttpsUrl(node[field])) errors.push(issue(file, field, "must be an HTTPS URL"));
  }
  return errors;
}

export async function loadPilot(pilotDirectory) {
  const nodePath = path.join(pilotDirectory, "node.json");
  const snapshotPath = path.join(pilotDirectory, "snapshot.json");
  const catalogDirectory = path.join(pilotDirectory, "catalog");
  const [node, snapshot, entityFiles] = await Promise.all([
    readJson(nodePath),
    readJson(snapshotPath),
    findJsonFiles(catalogDirectory)
  ]);
  const entities = [];
  const errors = validateNode(node, nodePath);

  if (snapshot.schema_version !== SCHEMA_VERSION) errors.push(issue(snapshotPath, "schema_version", `must equal ${SCHEMA_VERSION}`));
  if (snapshot.node_id !== node.node_id) errors.push(issue(snapshotPath, "node_id", "must equal node.json node_id"));
  if (!isDate(snapshot.snapshot_date)) errors.push(issue(snapshotPath, "snapshot_date", "must be an ISO 8601 date"));
  if (!Array.isArray(snapshot.changes)) errors.push(issue(snapshotPath, "changes", "must be an array"));

  const entityIds = new Set();
  for (const file of entityFiles) {
    const entity = await readJson(file);
    errors.push(...validateEntity(entity, file));
    if (entityIds.has(entity.id)) errors.push(issue(file, "id", "duplicates another entity id in this pilot"));
    entityIds.add(entity.id);
    entities.push(entity);
  }

  entities.sort((a, b) => a.id.localeCompare(b.id));
  return { node, snapshot, entities, entityFiles, errors };
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function digest(text) {
  return createHash("sha256").update(text).digest("hex");
}

export async function createArtifacts(pilotDirectory) {
  const { node, snapshot, entities, errors } = await loadPilot(pilotDirectory);
  if (errors.length > 0) throw new Error(`Pilot validation failed:\n${errors.join("\n")}`);

  const catalog = {
    schema_version: SCHEMA_VERSION,
    node_id: node.node_id,
    snapshot_date: snapshot.snapshot_date,
    entities
  };
  const changes = {
    schema_version: SCHEMA_VERSION,
    node_id: node.node_id,
    snapshot_date: snapshot.snapshot_date,
    changes: snapshot.changes
  };

  const artifacts = new Map([
    ["catalog.json", stableJson(catalog)],
    ["catalog.jsonl", entities.map((entity) => JSON.stringify(entity)).join("\n") + (entities.length > 0 ? "\n" : "")],
    ["changes.json", stableJson(changes)],
    ["node.json", stableJson(node)]
  ]);

  const manifest = {
    format_version: SCHEMA_VERSION,
    node_id: node.node_id,
    snapshot_date: snapshot.snapshot_date,
    entity_count: entities.length,
    artifacts: [...artifacts.entries()].map(([name, content]) => ({
      path: name,
      media_type: name.endsWith(".jsonl") ? "application/x-ndjson" : "application/json",
      bytes: Buffer.byteLength(content),
      sha256: digest(content)
    }))
  };
  artifacts.set("manifest.json", stableJson(manifest));
  return artifacts;
}

export async function writeArtifacts(outputDirectory, artifacts) {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([...artifacts.entries()].map(([name, content]) => writeFile(path.join(outputDirectory, name), content, "utf8")));
}

export async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile()).map((entry) => entry.name).sort();
}

export async function fileExists(file) {
  try {
    return (await stat(file)).isFile();
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}
