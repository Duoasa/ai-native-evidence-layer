import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { findJsonFiles, loadPilot, readJson, validateEntity, validateNode, fileExists } from "./lib/catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

async function findMarkdownFiles(directory) {
  const files = [];
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if ([".git", "dist", "node_modules"].includes(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await findMarkdownFiles(target));
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(target);
  }
  return files;
}

function collectRelativeRefs(value, refs = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectRelativeRefs(item, refs);
  } else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key === "$ref" && typeof item === "string" && !item.includes(":")) refs.push(item);
      else collectRelativeRefs(item, refs);
    }
  }
  return refs;
}

const schemaFiles = await findJsonFiles(path.join(root, "schema"));
const schemaIds = new Set();
for (const file of schemaFiles) {
  const schema = await readJson(file);
  if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema") errors.push(`${file}:$schema: must use JSON Schema 2020-12`);
  if (typeof schema.$id !== "string" || !schema.$id.startsWith("urn:ai-native-evidence-layer:")) errors.push(`${file}:$id: must use the project URN namespace`);
  if (schemaIds.has(schema.$id)) errors.push(`${file}:$id: duplicates another schema identifier`);
  schemaIds.add(schema.$id);
  for (const reference of collectRelativeRefs(schema)) {
    const target = path.resolve(path.dirname(file), reference.split("#", 1)[0]);
    if (!await fileExists(target)) errors.push(`${file}:$ref: missing local schema ${reference}`);
  }
}

const exampleEntityPath = path.join(root, "examples", "example-entity.json");
const exampleNodePath = path.join(root, "examples", "example-node.json");
errors.push(...validateEntity(await readJson(exampleEntityPath), exampleEntityPath));
errors.push(...validateNode(await readJson(exampleNodePath), exampleNodePath));

const pilotDirectory = path.join(root, "pilots", "research-sources");
const pilot = await loadPilot(pilotDirectory);
errors.push(...pilot.errors);

const bilingualPairs = [
  ["README.md", "README.zh-CN.md"],
  ["CONTRIBUTING.md", "CONTRIBUTING.zh-CN.md"],
  ["GOVERNANCE.md", "GOVERNANCE.zh-CN.md"],
  ["CODE_OF_CONDUCT.md", "CODE_OF_CONDUCT.zh-CN.md"],
  ["SECURITY.md", "SECURITY.zh-CN.md"],
  ["SUPPORT.md", "SUPPORT.zh-CN.md"],
  ["ROADMAP.md", "ROADMAP.zh-CN.md"],
  ["docs/product-brief.md", "docs/product-brief.zh-CN.md"],
  ["docs/architecture.md", "docs/architecture.zh-CN.md"],
  ["docs/data-principles.md", "docs/data-principles.zh-CN.md"],
  ["docs/licensing.md", "docs/licensing.zh-CN.md"],
  ["docs/release-process.md", "docs/release-process.zh-CN.md"],
  ["docs/specs/bootstrap-v0.1.md", "docs/specs/bootstrap-v0.1.zh-CN.md"],
  ["docs/specs/publication-v0.1.md", "docs/specs/publication-v0.1.zh-CN.md"],
  ["docs/adr/0001-repository-as-initial-node.md", "docs/adr/0001-repository-as-initial-node.zh-CN.md"],
  ["docs/adr/0002-claim-centric-evidence-model.md", "docs/adr/0002-claim-centric-evidence-model.zh-CN.md"]
];

for (const pair of bilingualPairs) {
  for (const relative of pair) {
    if (!await fileExists(path.join(root, relative))) errors.push(`${relative}: missing bilingual counterpart`);
  }
}

const markdownFiles = await findMarkdownFiles(root);
for (const file of markdownFiles) {
  const content = await readFile(file, "utf8");
  const links = content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g);
  for (const match of links) {
    const target = match[1].trim();
    if (target.startsWith("#") || target.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
    const localPath = target.split("#", 1)[0].split("?", 1)[0];
    if (localPath === "") continue;
    const resolved = path.resolve(path.dirname(file), decodeURIComponent(localPath));
    if (!await fileExists(resolved)) errors.push(`${file}: broken local Markdown link ${target}`);
  }
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Validation passed: ${schemaFiles.length} schemas, 2 examples, ${pilot.entities.length} pilot entities, ${bilingualPairs.length} bilingual document pairs, ${markdownFiles.length} Markdown files.`);
}
