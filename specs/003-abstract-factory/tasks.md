# Tasks: Abstract Factory

- [x] T001 Fill the `abstract-factory` catalog entry with the four implementation paths
- [x] T002 [US1] `docs/patterns/abstract-factory.md` from the original README: nine sections, Mermaid diagram of the ten participants, participants table with a column per language, Language notes
- [x] T010 [P] [US2] Java tests `AbstractFactoryTest`, `AbstractFactoryExampleTest` then the ten classes; services line; `./mvnw -q verify`; jar runs `abstract-factory`
- [x] T020 [P] [US2] Python `patterns/abstractfactory/__init__.py` and `tests/test_abstractfactory.py`; ruff, mypy, pytest; `uv run patterns run abstract-factory`
- [x] T030 [P] [US2] TypeScript `src/abstract-factory/` + registry entry; lint, test; `tsx src/cli.ts run abstract-factory`
- [x] T040 [P] [US2] JavaScript `src/abstract-factory/` + registry entry; lint, test; `node src/cli.js run abstract-factory`
- [x] T050 [US3] `make snapshot`; four identical files
- [x] T051 [US3] `make check`, `patterns validate --write-readme`, `make validate` green
- [x] T052 Commit, push, PR, workflows green, merge into `master`
