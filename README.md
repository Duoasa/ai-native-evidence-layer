# AI-Native Distributed Web Knowledge & Evidence Layer

[简体中文](README.zh-CN.md) | English

> Make every piece of information an AI uses explicit about what it is, where it came from, and when it is valid.

This repository is the open starting point for an AI-native, distributed, machine-readable knowledge and evidence layer for the web. It defines interoperable data contracts, validation tooling, governance rules, and small reference pilots that let independent parties publish structured claims with provenance, time, scope, and verification state.

The project is not a centralized “global truth database.” It is infrastructure for independently operated nodes whose claims remain attributable, portable, comparable, and open to verification.

## Status

**Bootstrap / pre-release.** No protocol version or dataset has been released. The current `v0.1` schemas are working drafts and may change incompatibly until the first tagged release.

Canonical repository: [github.com/Duoasa/ai-native-evidence-layer](https://github.com/Duoasa/ai-native-evidence-layer)

## Design principles

- **Evidence before authority:** important claims point to inspectable sources.
- **Plurality before silent overwrite:** conflicting claims may coexist with explicit scope and status.
- **Time is part of meaning:** observed, effective, expiry, and withdrawal times are distinct.
- **Open and portable:** schemas, tooling, and generated formats do not depend on one AI vendor.
- **Distributed by construction:** any party can implement or operate a compatible node.
- **Human-accountable automation:** machine extraction is labeled and never silently promoted to verified fact.
- **Privacy by minimization:** nodes collect only data needed for their declared domain.

## Conceptual architecture

```text
Publishers and maintainers
          ↓
Independent evidence nodes
          ↓
Open schemas and exchange formats
          ↓
Indexes, validators, and conflict-aware aggregation
          ↓
AI retrieval and reasoning
          ↓
Answers with provenance, time, scope, and uncertainty
```

## Repository layout

```text
schema/        Versioned machine-readable contracts
pilots/        Small domains that test the contracts
examples/      Non-production examples
scripts/       Dependency-free validation and build tools
tests/         Contract and failure-semantics tests
docs/          Product, architecture, governance, and decisions
dist/          Deterministically generated machine artifacts
.github/       Contribution templates and continuous validation
```

## Quick start

Requirements: Node.js 24 and npm 11 or newer.

```bash
npm ci
npm run check
```

Useful commands:

```bash
npm run validate   # Validate schemas, examples, pilot data, and bilingual coverage
npm test           # Exercise semantic validation and failure cases
npm run build      # Regenerate dist/catalog.json, JSONL, node metadata, and changes
npm run check      # Run the complete local verification gate
```

## Initial pilot

The proposed first pilot is a compact catalog of research information sources. It exists to test the evidence model, not to define the project's permanent scope. Pilot entries must follow the same provenance and state rules as any future node.

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md), then use the structured issue and pull request templates. Schema changes require a written rationale and compatibility impact. Data corrections require source evidence.

Project decisions are governed by [GOVERNANCE.md](GOVERNANCE.md). Security issues follow [SECURITY.md](SECURITY.md), and releases follow the evidence-gated [release process](docs/release-process.md).

## Open-source commitment

Original project code, schemas, and documentation are licensed under the [Apache License 2.0](LICENSE). Catalog data and third-party evidence have separate provenance and licensing requirements described in [docs/licensing.md](docs/licensing.md). The project will not require a proprietary service to validate, build, export, or self-host its core artifacts.

## Current truth

The current implementation state, verification evidence, open risks, and exact next action live in [docs/handoff.md](docs/handoff.md). Plans are not release claims; only tagged, verified artifacts are releases.
