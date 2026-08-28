# ADR-0001: Use the Git Repository as the Initial Coordination Node

[简体中文](0001-repository-as-initial-node.zh-CN.md) | English

Status: Accepted
Date: 2026-08-28

## Context

The long-term design is distributed, but a solo maintainer needs a transparent and inexpensive starting point that supports review, history, reproducibility, and forks.

## Decision

Use the public Git repository as the first coordination node. Source data and schemas are reviewed through pull requests; Git records catalog change history; deterministic artifacts are built from committed files.

The repository is not itself evidence for external claims. Claim references remain authoritative for provenance.

## Alternatives considered

- **Hosted database first:** faster dynamic queries but creates operational cost and a central service dependency before semantics are proven.
- **Custom federation first:** aligns with the final vision but introduces identity, transport, trust, and synchronization risks too early.
- **Wiki pages:** approachable for humans but weaker for deterministic machine contracts.

## Consequences

- Positive: open review, forks, version history, low cost, reproducible releases.
- Tradeoff: write throughput and real-time updates are limited.
- Follow-up: define independent node discovery only after the first pilot succeeds.
