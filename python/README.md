# Python

Design patterns in Python 3.12+, one package per pattern under
`src/patterns/`. The `runtime` package holds the `Example` and `Output`
protocols, discovery and the CLI.

## Requirements

* [uv](https://docs.astral.sh/uv/). It provisions the interpreter
  (`.python-version`), the virtual environment and the lockfile.

## Commands

```bash
uv sync                    # create .venv and install dev tools
uv run pytest              # tests with branch coverage, gate > 90 %
uv run ruff check . && uv run ruff format --check . && uv run mypy
uv run patterns list       # JSON array of pattern ids
uv run patterns run strategy
uv run patterns run --all
```

## Conventions

See [`docs/conventions.md`](../docs/conventions.md). Packages use a single
lower-case word or compound (`chainofresponsibility`); the catalog id stays
kebab-case. Each pattern package exposes an `example` object.
