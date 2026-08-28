# Bootstrap v0.1 Execution Specification

[简体中文](bootstrap-v0.1.zh-CN.md) | English

ID: BOOTSTRAP-001
Status: Implemented and locally verified
Baseline: Empty initialized Git repository on `main`
Updated: 2026-08-28
Governing rules: [AGENTS.md](../../AGENTS.md)

## Decision

Create a public-ready, bilingual, specification-first repository with one deterministic validation and build slice. Do not publish or push externally in this phase.

## Goals

- Establish product, governance, security, licensing, contribution, and handoff truth.
- Define draft node, entity, claim, reference, and catalog schemas.
- Validate examples and pilot source files without proprietary services.
- Generate deterministic JSON/JSONL artifacts.
- Add read-only CI and structured issue/PR templates.

## Non-goals

- Populate a real domain catalog.
- Implement federation, semantic search, crawling, hosted APIs, or external writes.
- Create a GitHub remote, organization, release, tag, or public website.
- Claim protocol stability or production readiness.

## Invariants

- Missing, unavailable, stale, disputed, and false remain distinct.
- Claims preserve references, method, observation time, and status.
- English and Simplified Chinese normative documents remain paired.
- Core checks run locally with no secrets and no proprietary service.
- Generated artifacts are not hand-maintained.

## Target data flow

```text
schemas + examples + pilot source files
                 ↓
       local semantic validator
                 ↓
        deterministic builder
                 ↓
              dist/*
                 ↓
          tests and read-only CI
```

## State and failure semantics

| State/event | Result | Recovery |
|---|---|---|
| Invalid JSON | Validation fails with file path | Correct source file |
| Missing reference | Claim rejected | Add evidence or represent unknown |
| Duplicate entity ID | Build blocked | Resolve identity deliberately |
| Missing translation pair | Validation fails | Add or update counterpart |
| No pilot entries | Valid empty draft catalog | Add reviewed entries later |
| External link unavailable | Local contract checks remain usable; source freshness is unknown | Retry separately and report the source as unavailable |

## Security and privacy

- Data read: committed repository files only.
- Data forbidden: secrets, private tokens, private personal data, unlicensed fixture copies.
- Side effects: local `dist/` generation only.
- External publication: requires explicit maintainer authorization.

## Phases

### Phase 1: Repository truth

- Exit: bilingual product and governance documents exist and cross-link correctly.

### Phase 2: Contract slice

- Exit: schemas, valid and invalid fixtures, validator, builder, and generated artifacts pass locally.

### Phase 3: GitHub collaboration

- Exit: issue forms, pull request template, security policy, and read-only CI are present.

### Phase 4: Verification and handoff

- Exit: `npm run check` passes; repository status and next action are recorded.

## Verification

Verified locally on 2026-08-28. All four phase exit conditions are satisfied.

| Check | Result | Evidence |
|---|---|---|
| JSON, schema references, examples, and local links | Verified | `npm run validate`: 5 schemas, 2 examples, 16 bilingual pairs, 39 Markdown files |
| Semantic invariants | Verified | `npm test`: 6 of 6 tests passed, including invalid fixtures |
| Deterministic artifacts | Verified | Build produced and reproduced 5 files in `dist/` |
| GitHub YAML syntax | Verified | 7 workflow, Dependabot, and Issue Form YAML files parsed locally |
| Secrets and debug placeholders | Verified | Repository pattern search returned no matches |

## Deferred owner decisions

- Final GitHub account/organization and repository URL.
- First pilot domain approval.
- Catalog data license.
- Public security contact and release signing policy.
