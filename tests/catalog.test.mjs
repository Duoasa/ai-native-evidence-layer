import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";
import { createArtifacts, readJson, validateEntity } from "../scripts/lib/catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("accepts a valid evidence entity", async () => {
  const file = path.join(root, "tests", "fixtures", "valid", "entity.json");
  assert.deepEqual(validateEntity(await readJson(file), file), []);
});

test("rejects a verified claim without a reference", async () => {
  const file = path.join(root, "tests", "fixtures", "invalid", "entity-missing-reference.json");
  const errors = validateEntity(await readJson(file), file);
  assert.ok(errors.some((error) => error.includes("must contain at least one inspectable reference")));
});

test("distinguishes unknown from false", async () => {
  const file = path.join(root, "tests", "fixtures", "valid", "entity.json");
  const entity = await readJson(file);
  entity.claims[0].status = "unknown";
  entity.claims[0].value = false;
  const errors = validateEntity(entity, file);
  assert.ok(errors.some((error) => error.includes("must be null when status is unknown")));
});

test("requires confidence for AI extraction", async () => {
  const file = path.join(root, "tests", "fixtures", "valid", "entity.json");
  const entity = await readJson(file);
  entity.claims[0].method = "ai_extraction";
  const errors = validateEntity(entity, file);
  assert.ok(errors.some((error) => error.includes("confidence")));
});

test("build artifacts are deterministic", async () => {
  const pilot = path.join(root, "pilots", "research-sources");
  const first = await createArtifacts(pilot);
  const second = await createArtifacts(pilot);
  assert.deepEqual([...first.entries()], [...second.entries()]);
  const catalog = JSON.parse(first.get("catalog.json"));
  assert.equal(catalog.entities.length, 0);
  assert.equal(catalog.snapshot_date, "2026-08-28");
});

test("fixture files remain parseable UTF-8 JSON", async () => {
  const file = path.join(root, "examples", "example-entity.json");
  const content = await readFile(file, "utf8");
  assert.doesNotThrow(() => JSON.parse(content));
});
