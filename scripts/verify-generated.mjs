import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createArtifacts, listFiles } from "./lib/catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pilotDirectory = path.join(root, "pilots", process.env.PILOT ?? "research-sources");
const outputDirectory = path.join(root, "dist");
const expected = await createArtifacts(pilotDirectory);
const actualNames = await listFiles(outputDirectory);
const expectedNames = [...expected.keys()].sort();
const errors = [];

if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames)) {
  errors.push(`dist file set differs: expected ${expectedNames.join(", ")}; found ${actualNames.join(", ")}`);
}

for (const [name, content] of expected) {
  let actual;
  try {
    actual = await readFile(path.join(outputDirectory, name), "utf8");
  } catch (error) {
    errors.push(`${name}: ${error.message}`);
    continue;
  }
  if (actual !== content) errors.push(`${name}: generated content is stale or hand-edited`);
}

if (errors.length > 0) {
  console.error("Generated artifact verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Generated artifact verification passed for ${expectedNames.length} files.`);
}
