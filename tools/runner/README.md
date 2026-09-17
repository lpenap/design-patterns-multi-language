# Orchestrator

The `patterns` command reads `catalog.yaml` and drives the per-language CLIs
through the shared protocol (`list`, `run <id>`, `run --all`). It knows nothing
about any language's internals.

Commands (delivered by spec 001):

```
patterns validate [--write-readme]   catalog <-> filesystem <-> docs <-> snapshots
patterns list [--lang <l>]
patterns run <id> [--lang <l>]       one pattern, all languages side by side
patterns run --all [--lang <l>]
patterns snapshot [--update]         write snapshots/<id>/<language>.txt
patterns check                       rerun, diff against snapshots and across languages
```

The root `Makefile` wraps these as `make validate`, `make list`, `make run`,
`make run-all`, `make snapshot` and `make check`.
