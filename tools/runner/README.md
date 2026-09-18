# Orchestrator

The `patterns` command reads `catalog.yaml` and drives the per-language CLIs
through the shared protocol (`list`, `run <id>`, `run --all`). It knows nothing
about any language's internals beyond the `run:` command line in the catalog.

## Invocation

From anywhere inside the repository:

```
node tools/runner/bin/patterns.js <command>
```

The root `Makefile` wraps it: `make validate`, `make list [L=<lang>]`,
`make run P=<id> [L=<lang>]`, `make run-all [L=<lang>]`,
`make snapshot [UPDATE=1]`, `make check`.

## Commands

| Command | Purpose | Exit |
|---|---|---|
| `validate [--write-readme] [--json]` | Catalog consistency: docs, implementation paths, each language's `list` vs the catalog, snapshots, the doc's expected-output block vs the reference snapshot, README catalogue section (regenerated with `--write-readme`) | 0 if no errors |
| `list [--lang <l>] [--json]` | Ids each language reports, in catalog order | 0 if every language answers |
| `run <id> [--lang <l>]` | One `== Language ==` block per language; `(not implemented)`, `(toolchain unavailable)` or `(failed, exit N)` where applicable | 0 if all invoked languages ok |
| `run --all [--lang <l>]` | Every implemented pattern, `## <id>` heading per pattern | as above |
| `snapshot [--update] [--lang <l>] [--pattern <id>]` | Record `snapshots/<id>/<lang>.txt`; refuses to overwrite a differing file without `--update` | 0 unless skipped or failed |
| `check [--json]` | Rerun everything, compare byte for byte with snapshots and across languages for `parity: strict`; loose differences are reported as information | 0 if no drift, mismatch or failure |

Exit codes of the language CLIs are mapped to statuses: 0 `ok`, 2
`unknown-example`, other `failed`, spawn error `toolchain-unavailable`.

## Layout

```
bin/patterns.js        entry shim (tsx)                   src/cli.ts       process wiring
src/main.ts            parse → load catalog → dispatch    src/args.ts      argument parsing
src/catalog.ts         load + validate catalog.yaml       src/languages.ts spawn a language CLI
src/commands/*.ts      validate, list, run, snapshot, check
src/readme.ts          catalogue table rendering          src/compare.ts   first differing line, parity
tests/fixtures/        a mini repository with a fake runner driven by behaviour.json
```

## Tests

`pnpm test` runs vitest against `tests/fixtures/`, copied to a temporary
directory per test. The fake runner implements the language protocol from
`behaviour.json`, so drift, failures, unknown ids and a missing toolchain are
simulated without Java, Python or a second Node project. Coverage gate: above
90 % lines and branches; only `bin/patterns.js` and `src/cli.ts` are excluded.
