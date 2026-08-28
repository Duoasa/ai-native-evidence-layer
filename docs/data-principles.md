# Data and Evidence Principles

[简体中文](data-principles.zh-CN.md) | English

## Claim, not truth cell

A record means “source S supports value V for subject P under qualifiers Q when observed at T.” It does not mean the project declares V universally true.

## Required distinctions

- **Entity:** a durable subject with a stable identifier.
- **Claim:** a property-value assertion about an entity.
- **Qualifier:** context that changes scope or interpretation.
- **Reference:** inspectable evidence and retrieval metadata.
- **Method:** how the node produced or reviewed the claim.
- **Status:** current evidence lifecycle state.

## Evidence quality

- Prefer direct primary sources for publisher capabilities and policies.
- Use secondary sources when they add independent observation or analysis.
- Label community reports and machine extraction explicitly.
- Preserve the exact source locator and revision when available.
- Store the minimum excerpt necessary; do not mirror third-party works by default.

## Time semantics

- `observed_at`: when the node inspected the evidence.
- `valid_from`: when the claim begins to apply, if known.
- `valid_until`: when the claim stops applying, if known.
- `retrieved_at`: when a specific reference was fetched.

The latest observation is not automatically the best claim. Historical and superseded claims may remain valuable when their scope and status are explicit.

## Failure semantics

| Condition | Required representation |
|---|---|
| Source cannot be reached | Retrieval unavailable; retain last observation as stale if policy allows |
| No evidence found | Unknown or absent observation; never fabricate false |
| Sources disagree | Preserve claims and mark dispute or scoped difference |
| Machine extraction uncertain | Label method and confidence; do not mark verified |
| Source removes a statement | Record withdrawal or new observation; preserve history |

## Privacy and safety

Do not collect sensitive personal data merely because it is public. A pilot must define inclusion, retention, redaction, and removal rules before accepting person-level records.
