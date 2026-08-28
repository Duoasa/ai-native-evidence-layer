# Contributing

[简体中文](CONTRIBUTING.zh-CN.md) | English

Thank you for helping build an open knowledge and evidence layer for AI. Contributions are welcome in specifications, validators, documentation, translations, pilot data, tests, and governance proposals.

## Before contributing

Read:

1. [README.md](README.md) for project scope.
2. [AGENTS.md](AGENTS.md) for durable repository rules.
3. [docs/data-principles.md](docs/data-principles.md) for evidence semantics.
4. [GOVERNANCE.md](GOVERNANCE.md) for decision rights.

## Local verification

Use Node.js 24 and npm 11 or newer.

```bash
npm ci
npm run check
```

The repository intentionally begins with no runtime dependencies. Propose new dependencies only when their benefit, maintenance cost, license, and security boundary are documented.

## Contribution paths

### Correct data

Use the **Data correction** issue form or open a pull request that:

- identifies the entity and claim;
- states the proposed value and scope;
- links to an inspectable source;
- records observation time;
- preserves conflicting claims instead of deleting supported evidence;
- does not include private or sensitive personal information.

### Add a pilot entry

Copy a valid example, assign a stable lowercase ID, and add references for every important claim. Run the full check before opening a pull request. Pilot data is domain evidence, not promotional copy.

### Change a schema

Schema changes require:

- a **Schema proposal** issue;
- affected use cases and failure semantics;
- compatibility and migration impact;
- updated examples, tests, generated artifacts, and both language documents;
- an ADR for consequential or difficult-to-reverse decisions.

Breaking changes are allowed before the first protocol release, but they must still be explicit and reviewable.

### Translate documentation

Keep the English and Simplified Chinese documents semantically equivalent. Do not change requirements in a translation-only pull request.

## Pull request requirements

- Keep one coherent change per pull request.
- Link the motivating issue or decision when one exists.
- Explain what changed, why, compatibility impact, and verification evidence.
- Update `docs/handoff.md` when repository state or the next action changes materially.
- Never hand-edit files in `dist/`; regenerate them with `npm run build`.
- Confirm that you have the right to contribute the submitted material under the repository's licensing policy.

## Review standard

Maintainers review for semantics, evidence quality, compatibility, privacy, security, deterministic generation, and bilingual consistency. A green CI run is necessary but does not prove that a source supports a claim.

## Conduct and security

Participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Report vulnerabilities according to [SECURITY.md](SECURITY.md), not in a public issue containing exploit details.
