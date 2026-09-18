# Contract: `patterns` Orchestrator

Invoked as `pnpm --filter @patterns/runner exec patterns <command>` or through
the Makefile. Finds the repository root by walking up to `catalog.yaml`.

| Command | Behaviour | exit |
|---|---|---|
| `validate [--write-readme] [--json]` | Checks catalog shape; doc files exist; implementation paths exist; each language's `list` equals the ids declared for it; snapshots exist for declared implementations; doc expected-output block equals reference snapshot; README catalogue section up to date (regenerated with `--write-readme`). Prints findings. | 0 no errors; 1 otherwise |
| `list [--lang <l>] [--json]` | Ids each language reports, grouped by language in catalog order. | 0; 1 if a language fails to answer |
| `run <id> [--lang <l>]` | One block per language: header `== <Language name> ==`, then the language's stdout, or `(not implemented)`, or `(toolchain unavailable)`, or `(failed, exit N)` + stderr. Id not in catalog → error before any spawn. | 0 if all invoked languages ok; 1 otherwise |
| `run --all [--lang <l>]` | Every catalogued pattern with implementations, in catalog order, blocks as above with a `## <id>` heading per pattern. | as above |
| `snapshot [--update] [--lang <l>] [--pattern <id>]` | Writes `snapshots/<id>/<lang>.txt` for each declared implementation. Existing identical file → `unchanged`; existing different file → `skipped (use --update)` and exit 1, or `updated` with the flag. | 0; 1 if any skipped or run failed |
| `check [--json]` | Reruns declared implementations, compares with snapshots and across languages (strict). Reports every outcome; summary line `check: N ok, N drift, N mismatch, N failed`. | 0 if all ok; 1 otherwise |

Common: `--json` prints machine-readable findings/results instead of text.
Unknown command or bad flags: usage line on stderr, exit 1. Makefile mapping:
`make validate`, `make list [L=]`, `make run P= [L=]`, `make run-all [L=]`,
`make snapshot [UPDATE=1]`, `make check`.
