# ADR-0002: Adopt a Claim-Centric Evidence Model

[简体中文](0002-claim-centric-evidence-model.zh-CN.md) | English

Status: Accepted
Date: 2026-08-28

## Context

A flat entity record encourages last-write-wins updates and hides source disagreement, time, scope, and extraction method.

## Decision

Represent knowledge as entities with individually identified claims. Each claim carries a predicate, value, method, observation time, lifecycle status, optional qualifiers, and one or more references.

## Alternatives considered

- **Flat records:** simple to query but erase provenance and conflict semantics.
- **Free-form documents:** expressive but force AI consumers to reconstruct structure repeatedly.
- **Full RDF/Wikibase compatibility immediately:** mature but too broad for the first vertical slice.

## Consequences

- Positive: claim-level citations, scoped conflict, explicit time, reviewable machine extraction.
- Tradeoff: more verbose records and more demanding authoring tools.
- Follow-up: test whether the draft can map cleanly to established linked-data formats without making that mapping a v0.1 requirement.
