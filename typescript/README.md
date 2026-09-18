# TypeScript

Design patterns in strict TypeScript, one folder per pattern under `src/`.
`src/runtime/` holds the `Example` and `Output` interfaces, the registry and
the CLI. Files run directly through `tsx`; there is no build output.

## Requirements

* Node 20.19+ and pnpm (pinned in the root `package.json`; `corepack enable`
  makes it available). Install from the repository root with `pnpm install`.

## Commands

```bash
pnpm test                  # vitest with v8 coverage, gate > 90 % lines and branches
pnpm lint                  # tsc --noEmit and eslint
pnpm exec tsx src/cli.ts list            # JSON array of pattern ids, exit 0
pnpm exec tsx src/cli.ts run strategy    # lines to stdout, exit 0; unknown id → stderr, exit 2
pnpm exec tsx src/cli.ts run --all       # every example, separated by 40 dashes
```

## Conventions

See [`docs/conventions.md`](../docs/conventions.md). Folders are kebab-case
like the catalog id (`chain-of-responsibility`). Each pattern folder exports
its Example, which `src/runtime/registry.ts` lists.
