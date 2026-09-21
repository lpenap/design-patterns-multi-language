# Phase 4 refactor tooling

Throwaway helpers that drive the one-class-per-file migration (PLAN.md §9,
Phase 4), one pull request per pattern per language. Paths are relative to the
repository root; run them from there.

| Script | Purpose |
|---|---|
| `split_python.py <pkg>` | Split `python/src/patterns/<pkg>/__init__.py` into one module per class, re-export from `__init__.py`, split the test file |
| `split_ts.py <typescript\|javascript> <id>` | Split `<lang>/src/<id>/<id>.<ext>` into one file per export, rewrite imports, split the test file |
| `prune_imports.py <typescript\|javascript> <id>` | Remove unused import specifiers in a pattern folder (called by `split_ts.py`) |
| `fix_doc_links.py <lang> <id> [<pkg>]` | Point the doc's Participants links at the per-class files |
| `do-refactor.sh <lang> <id> <pkg> "<Name>"` | Branch, split, checks, doc links, then `finish-refactor.sh` |
| `finish-refactor.sh <NNN> <lang> <id> "<Name>"` | Gate (`make check` 108 ok, no snapshot change, no validator warning left, lint, test), commit, push, open the PR |
| `merge-refactor.sh <pr> <NNN> <lang> <id> "<Name>"` | Wait for checks, merge, tick PLAN.md and the spec task, push |

They are removed in spec 033 once every language is migrated.
