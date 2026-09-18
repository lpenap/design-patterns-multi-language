# Contract: Language CLI Protocol

Every language directory exposes one command, named in `catalog.yaml` under
`languages.<id>.run`, executed from the repository root.

| Command | stdout | stderr | exit |
|---|---|---|---|
| `list` | JSON array of ids, sorted ascending, compact (`["a","b"]`), followed by `\n`; `[]` when empty | empty | 0 |
| `run <id>` | the example's lines, each followed by `\n`; nothing else | empty | 0 |
| `run <id>` (unknown) | empty | one line: `unknown example: <id>` | 2 |
| `run <id>` (example throws) | empty (lines are buffered and discarded) | one line: `example failed: <id>: <message>` | 1 |
| `run --all` | each example's output in id order, consecutive outputs separated by a line of 40 dashes | one line per failed example | 0, or 1 if any failed |
| `run --all` (no examples) | empty | empty | 0 |
| anything else / no args | empty | one line: `usage: <prog> list | run <id> | run --all` | 1 |
| start-up with duplicate ids | empty | one line: `duplicate example id: <id>` | 1 |

Production builds contain no examples until pattern specs add them: `list`
prints `[]`. Fixture examples (`fixture-alpha`, `fixture-beta`) exist only in
test code.

Per-language invocation (as in `catalog.yaml`):

| Language | Command |
|---|---|
| Java | `java -jar java/target/patterns.jar` |
| Python | `uv run --project python patterns` |
| TypeScript | `pnpm --dir typescript exec tsx src/cli.ts` |
| JavaScript | `node javascript/src/cli.js` |
