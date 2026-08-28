import { fileURLToPath } from "node:url";
import path from "node:path";
import { createArtifacts, writeArtifacts } from "./lib/catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pilotName = process.env.PILOT ?? "research-sources";
const pilotDirectory = path.join(root, "pilots", pilotName);
const outputDirectory = path.join(root, "dist");

const artifacts = await createArtifacts(pilotDirectory);
await writeArtifacts(outputDirectory, artifacts);
console.log(`Built ${artifacts.size} deterministic artifacts for pilot '${pilotName}'.`);
