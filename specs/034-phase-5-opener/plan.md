# Implementation Plan: Phase 5 Opener — Catalogue, Principles, Future Work

**Branch**: `034-phase-5-opener` | **Date**: 2026-09-25 | **Spec**: [spec.md](spec.md)

Constitution check: no amendment. Principle I (documentation as a first-class artefact) is served by the principles page; the catalogue stays the single source of truth. All principles PASS.

```text
catalog.yaml                                   category enterprise; 23 entries, no implementations
docs/references.md                             entries 17–24
docs/principles.md                             twelve principles with citations
docs/patterns/*.md                             *Principles:* line after Intent (25 docs)
docs/future/genai-patterns.md                  deferred catalogue, decision 19
docs/future/api-design-patterns.md             deferred catalogue, decision 19
README.md                                      Contents, Principles and Future work sections; catalogue regenerated
.specify/templates/pattern-spec-template.md    FR-001 requires the principles line
PLAN.md                                        spec 034 ticked
```

Design notes: the principles line sits inside the Intent section so the doc outline required by FR-001 of the pattern template (nine sections in a fixed order) is unchanged. Anchors are GitHub's heading slugs of `docs/principles.md`. The mapping from pattern to principles follows Head First Design Patterns' own attributions where the book makes one, and the GoF "Applicability" text otherwise.
