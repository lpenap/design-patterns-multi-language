# JavaScript

Design patterns in plain JavaScript: ES modules on Node, no build step, no
types. This is a separate implementation from the TypeScript one on purpose:
it shows the dynamic, duck-typed rendition of each pattern.

`src/runtime/` holds the `Example` and `Output` conventions, the registry and
the CLI.

## Requirements

* Node 20.19+ and pnpm (pinned in the root `package.json`; `corepack enable`
  makes it available). Install from the repository root with `pnpm install`.

## Commands

```bash
pnpm test                  # node:test under c8, gate > 90 % lines and branches
pnpm lint                  # eslint
pnpm cli list              # JSON array of pattern ids
pnpm cli run strategy
pnpm cli run -- --all
```

## Conventions

See [`docs/conventions.md`](../docs/conventions.md). Folders are kebab-case
like the catalog id (`chain-of-responsibility`). Each pattern folder exports
its Example, which `src/runtime/registry.js` lists.
