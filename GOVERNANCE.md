# Governance

[简体中文](GOVERNANCE.zh-CN.md) | English

## Purpose

Governance keeps the protocol open, reviewable, and independent of any single vendor or pilot. It also separates accepted evidence from unchecked submission volume.

## Roles

- **Contributor:** proposes code, data, documentation, translation, or decisions.
- **Reviewer:** evaluates a contribution within a documented area of competence.
- **Maintainer:** merges changes, manages releases, resolves routine process questions, and protects project invariants.
- **Protocol maintainer:** approves schema compatibility policy and version transitions. Initially this is the project maintainer role.

Roles are earned through sustained, constructive contribution. Role changes are recorded publicly. No role makes a person's unsupported claim authoritative.

## Decision process

1. Routine, reversible changes use pull request review.
2. Data disputes preserve referenced alternatives and document scope rather than forcing false consensus.
3. Consequential schema, licensing, security, or federation changes begin with an issue and end with an ADR.
4. Maintainers seek rough consensus. When a timely decision is necessary, the responsible maintainer records the decision, dissent, and consequences.
5. Security incidents may be handled privately until coordinated disclosure is safe.

## Compatibility

- Draft schemas may change incompatibly before the first tagged protocol release.
- Released schema versions are immutable.
- Breaking changes require a new version and a migration note.
- Nodes declare the exact schema version they publish.

## Independence and conflicts of interest

Commercial sponsorship or employment does not grant protocol control. Reviewers disclose material conflicts when evaluating claims or integrations related to themselves, their employer, or a sponsor.

## Appeals and conduct

An affected contributor may request a second review in the issue or pull request. Conduct enforcement follows the Code of Conduct and should be documented with the minimum disclosure necessary for safety and accountability.

## Project continuity

At least one reproducible export, current handoff, and documented release procedure must remain available so the project can be forked or resumed if maintainers become inactive.
