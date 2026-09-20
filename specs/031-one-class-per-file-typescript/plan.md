# Implementation Plan: One Class per File — TypeScript

**Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Constitution check: PASS (this spec implements Principle IV's one-class-per-file rule).

Mechanics per pattern: a splitter (kept outside the repository) moves each top-level declaration into its own file and rewrites imports; the result is reviewed and gated by lint, type checks, tests, `make check` (108 ok, no snapshot change) and `patterns validate` (no warning left for the pattern in TypeScript). The doc's Participants links for TypeScript are updated in the same PR.
