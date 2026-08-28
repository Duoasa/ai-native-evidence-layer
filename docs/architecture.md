# Architecture

[简体中文](architecture.zh-CN.md) | English

## Responsibility layers

| Layer | Owns | Must not silently own |
|---|---|---|
| Publisher | Source statements and revisions | Independent verification |
| Evidence node | Normalization, references, observation state | Universal truth |
| Schema | Portable meaning and compatibility | Domain ranking policy |
| Validator | Structural and deterministic semantic checks | Human source judgment |
| Index/aggregator | Discovery, projection, conflict-preserving combination | Provenance erasure |
| AI consumer | Query planning, comparison, explanation | Unlabeled fact invention |

## Initial repository data flow

```text
Pilot source JSON
      ↓ validate
Normalized entities and claims
      ↓ deterministic build
dist/catalog.json + catalog.jsonl + node.json + changes.json
      ↓ consume
AI clients, static explorers, and independent validators
```

The initial Git repository is a transparent coordination node, not the final federation architecture. Pull requests propose changes; review establishes catalog acceptance; Git history records catalog edits; references remain the evidence for external claims.

## Dependency direction

```text
schemas ← validation library ← CLI scripts ← CI
   ↑              ↑
examples       pilot catalogs
```

Domain pilots may depend on the core schema. The core schema must not import a pilot's vocabulary as a protocol invariant. Extensions use namespaced objects until a shared property is intentionally standardized.

## State model

Claims use explicit states:

- `asserted`: a source makes the claim; no independent review is implied.
- `verified`: the cited source was reviewed under a documented method.
- `disputed`: relevant evidence conflicts or interpretation remains contested.
- `stale`: the observation exceeded its domain freshness policy.
- `withdrawn`: the publisher or node intentionally retracted the claim.
- `unknown`: the system cannot determine a supported value.

Absence of a claim is not a negative claim. Retrieval failure is not evidence of nonexistence.

## Future federation boundary

Federation requires stable node identity, schema version negotiation, cross-node entity mapping, conflict preservation, and authenticated artifact provenance. Those capabilities are intentionally deferred until the first pilot validates the claim model.
