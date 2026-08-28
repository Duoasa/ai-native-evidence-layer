# Security Policy

[简体中文](SECURITY.zh-CN.md) | English

## Supported versions

The project is pre-release. No version currently receives a production security support guarantee. Security fixes target the default branch until the first supported release policy is published.

## Reporting a vulnerability

Do not open a public issue containing exploit details, secrets, or affected personal data.

When the public repository enables GitHub private vulnerability reporting, use **Security → Report a vulnerability**. Until then, contact the repository owner through a private channel published on their verified GitHub profile and include:

- affected commit or artifact;
- impact and prerequisites;
- minimal reproduction;
- suggested mitigation, if known;
- whether disclosure is time-sensitive.

Maintainers will acknowledge receipt when a private channel is operational, assess impact, coordinate a fix, and disclose after users can update safely. This file will be updated with concrete response targets before the first public release.

## Security boundaries

- Core validation and builds must not require repository secrets.
- CI uses read-only permissions unless a separately reviewed workflow requires more.
- External action dependencies are pinned to immutable commits.
- Pilot data must not contain credentials or private personal data.
- Automated retrieval must use bounded retries, timeouts, and explicit unavailable states.
