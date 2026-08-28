# Public Repository Publication v0.1

[简体中文](publication-v0.1.zh-CN.md) | English

ID: PUBLICATION-001
Status: Implemented and remotely verified
Baseline: Locally verified `0.0.0` bootstrap repository
Updated: 2026-08-28
Governing rules: [AGENTS.md](../../AGENTS.md)

## Decision

Publish the bootstrap repository at [Duoasa/ai-native-evidence-layer](https://github.com/Duoasa/ai-native-evidence-layer) as a public GitHub repository. English is the default README and normative language; Simplified Chinese counterparts remain first-class and semantically equivalent.

## Publication contract

- Visibility is public.
- The default branch is `main`.
- The canonical remote is `https://github.com/Duoasa/ai-native-evidence-layer`.
- GitHub-side initialization remains disabled so the reviewed local history is authoritative.
- The initial publication is a source repository bootstrap, not a protocol or dataset release.
- No tag, GitHub Release, package publication, or real pilot dataset is created by this operation.

## Security and identity

- Commit identity uses the `Duoasa` GitHub noreply address.
- Authentication material and machine-specific SSH configuration remain outside the repository.
- Push transport uses authenticated SSH; the public canonical URL remains provider-neutral HTTPS metadata.
- CI keeps read-only repository permissions and requires no secrets.

## Verification

1. Run `npm ci --ignore-scripts --no-audit --no-fund`.
2. Run `npm run check` and the repository hygiene audit.
3. Push the reviewed initial commit to `origin/main`.
4. Inspect the public repository as served by GitHub and confirm visibility, English README, Apache-2.0 license detection, committed generated artifacts, and CI execution.

Remote verification completed on 2026-08-28:

- GitHub displayed the repository as Public with `main` as the default branch.
- Commit [`171dc13`](https://github.com/Duoasa/ai-native-evidence-layer/commit/171dc135547b1c8c4b8a82709d986ed7c0099c3f) was served with the English README, Chinese counterpart, generated artifacts, and Apache-2.0 license detection.
- [CI run 33154204854](https://github.com/Duoasa/ai-native-evidence-layer/actions/runs/33154204854) completed successfully in 13 seconds.
- GitHub showed no tags, releases, or packages.

## Recovery

- If the push fails, keep the public repository empty and repair transport without weakening repository security.
- If remote contents differ, stop publication and reconcile against the reviewed local commit.
- Do not rewrite the published `main` history unless the maintainer explicitly approves a history repair.
