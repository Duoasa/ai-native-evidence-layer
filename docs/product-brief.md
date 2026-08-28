# Product Brief

[简体中文](product-brief.zh-CN.md) | English

Status: Approved vision; proposed first pilot
Owner: Project maintainer
Updated: 2026-08-28
Canonical repository: [github.com/Duoasa/ai-native-evidence-layer](https://github.com/Duoasa/ai-native-evidence-layer)

## Product promise

Enable independent publishers to provide AI systems with structured claims whose provenance, time, scope, and verification state remain explicit and portable.

## Primary users and jobs

- **AI application builders:** retrieve evidence without scraping presentation-oriented pages.
- **Domain catalog maintainers:** publish trustworthy, versioned, machine-readable records.
- **Information publishers:** state what they provide while preserving identity and revision context.
- **Researchers and reviewers:** inspect why an AI-accessible claim exists and challenge it with evidence.

## First coherent release

- Publish a draft claim-centric schema with reference, time, scope, and status semantics.
- Validate one narrow pilot catalog from source files to deterministic JSON and JSONL artifacts.
- Answer a small benchmark set using only generated catalog data while preserving claim references.
- Document a contribution, dispute, migration, and release process that an independent fork can reproduce.

## Non-goals for the first release

- Index the whole web.
- Establish one central authority for truth.
- Support private or sensitive personal datasets.
- Perform autonomous write actions against external systems.
- Provide a general-purpose crawler, vector database, or hosted commercial service.
- Stabilize federation before a single-node pilot proves the semantics.

## Constraints

- **Distribution:** public Git repository; deterministic static exports; self-hostable tooling.
- **Privacy and security:** no secrets or private personal data; explicit trust boundaries.
- **Operations:** one maintainer must be able to validate, release, and hand off the project.
- **Compatibility:** versioned schemas; released versions immutable; migrations explicit.
- **Localization:** normative user-facing documents in English and Simplified Chinese.

## Success evidence

- The repository can be cloned and fully checked without proprietary services.
- Every important pilot claim has at least one inspectable reference.
- Missing, unavailable, stale, disputed, and false states remain distinguishable.
- Generated outputs are deterministic and reproduce from committed source files.
- A second implementation can consume the released schema without private guidance.

## Owner decisions still needed

- Confirm or replace the proposed research-information-sources pilot.
- Decide the data dedication/license before publishing the first non-example catalog.
- Define maintainer contact channels before the first public release.
