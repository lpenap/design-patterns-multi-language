# Data Model: CLI Runner

## Catalog (read from `catalog.yaml`)

| Field | Type | Rules |
|---|---|---|
| `version` | integer | must be `1` |
| `languages` | ordered map `id → Language` | order is the display and reference order |
| `Language.name` | string | display name |
| `Language.dir` | string | existing directory relative to repo root |
| `Language.run` | string | whitespace-separated command executed from repo root |
| `categories` | list of `{id, name}` | ids unique; every pattern's category must be listed |
| `patterns` | list of `Pattern` | ids unique, kebab-case `^[a-z][a-z0-9]*(-[a-z0-9]+)*$`, never prefixed `fixture-` |
| `Pattern.id, icon, name, category, intent, doc` | strings | `doc` path relative to repo root |
| `Pattern.parity` | `strict` \| `loose` | default `strict` |
| `Pattern.implementations` | map `languageId → path` | keys must be catalog languages; empty map = pending |

## Example (per language)

| Member | Meaning |
|---|---|
| `id` | catalog id, kebab-case |
| `run(out)` | writes zero or more lines through `out.line(text)`; may throw |

Rules: ids unique within a language (duplicate → start-up failure, exit 1).

## Output (per language)

`line(text)` appends one line. Concrete forms: console (`stdout`, adds `\n`)
and `BufferOutput` (collects lines for tests and for the orchestrator-facing
`run`, which prints them at the end so a throwing example leaves stdout clean).

## Snapshot

Path `snapshots/<patternId>/<languageId>.txt`. Content: exactly the stdout of
`run <id>` for that language (each line + `\n`; empty file when no lines).
Written by `snapshot`, read by `check` and `validate`.

## RunResult (orchestrator)

| Field | Type |
|---|---|
| `pattern` | id |
| `language` | id |
| `status` | `ok` \| `unknown-example` (exit 2) \| `failed` (exit 1 or other) \| `toolchain-unavailable` (spawn error) \| `not-implemented` (no path in catalog) |
| `stdout`, `stderr` | string |
| `exitCode` | number \| null |

## Comparison outcomes (`check`)

| Outcome | Condition | Effect |
|---|---|---|
| match | stdout == snapshot | none |
| drift | stdout != snapshot | fail; report pattern, language, first differing line number and both lines |
| missing snapshot | no file for a declared implementation | fail |
| strict mismatch | parity strict and two languages' stdout differ | fail; report pattern and languages |
| loose mismatch | parity loose and languages differ | info only |
| run failure | status ≠ ok | fail |

## Validation findings (`validate`)

Each finding: `level` (`error` \| `warning`), `pattern?`, `language?`,
`message`. Any error → exit 1. Warnings (non-ASCII output) never fail.
