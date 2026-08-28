# Release Process

[简体中文](release-process.zh-CN.md) | English

No release currently exists. This process defines the minimum evidence required before a maintainer may publish one.

## Versioned objects

- **Repository release:** a reviewed snapshot of schemas, tooling, documentation, examples, and generated artifacts. Before a dedicated protocol policy is accepted, repository releases use Semantic Versioning and remain pre-`1.0`.
- **Schema version:** declared inside every compatible object. A released schema file is immutable; breaking contract changes require a new schema version and migration note.
- **Catalog snapshot:** identified by node ID, snapshot date, artifact hashes, and the schema version it implements. A new snapshot does not automatically create a new protocol version.

## Release prerequisites

- Scope and compatibility impact are documented in an accepted specification or ADR when required.
- Catalog material has an approved license, provenance, and privacy review.
- `CHANGELOG.md`, examples, migrations, and bilingual normative documents describe the release accurately.
- `npm ci` and `npm run check` pass from a clean checkout.
- Generated files reproduce exactly and `dist/manifest.json` matches the released files.
- CI uses least privilege, no secrets are embedded, and known material security issues are resolved or explicitly disclosed.
- A maintainer records approval; automation alone cannot authorize publication.

## Publication procedure

1. Freeze the candidate commit and run the complete gate from a clean checkout.
2. Review diffs, provenance, licenses, privacy, security, and compatibility.
3. Set the intended version and move the changelog entries out of **Unreleased**.
4. Create a signed, annotated Git tag without rewriting an existing release tag.
5. Create a GitHub Release from that tag and attach the deterministic artifacts and manifest when applicable.
6. Download the public artifacts, verify hashes and contents, and record the result in `docs/handoff.md`.

Remote publication, tags, and releases require explicit maintainer authorization at the time of release.

## Correction and withdrawal

- Never silently replace a released artifact or move its tag.
- Publish a new corrective release and explain the affected versions and migration path.
- If an artifact exposes sensitive data or presents an immediate security risk, restrict access when necessary, preserve an auditable incident record with minimal disclosure, and publish a safe replacement.
- Data corrections preserve supported historical claims and issue a new catalog snapshot rather than rewriting published history.
