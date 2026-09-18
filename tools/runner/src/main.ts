import { type Catalog, CatalogError, findRoot, loadCatalog } from "./catalog.ts";
import { parseArgs } from "./args.ts";
import { check } from "./commands/check.ts";
import { list } from "./commands/list.ts";
import { run, runAll } from "./commands/run.ts";
import { snapshot } from "./commands/snapshot.ts";
import { validate } from "./commands/validate.ts";
import { type Context, type Io, UsageError } from "./context.ts";

export interface MainOptions {
  readonly cwd: string;
  readonly io: Io;
  /** Overrides catalog loading; tests pass a fixture catalog. */
  readonly loadCatalog?: (root: string) => Catalog;
}

/** Parses arguments, loads the catalog and dispatches; returns the exit code. */
export function main(argv: readonly string[], options: MainOptions): number {
  try {
    const args = parseArgs(argv);
    const root = findRoot(options.cwd);
    const catalog = (options.loadCatalog ?? loadCatalog)(root);
    const ctx: Context = { root, catalog, io: options.io };
    const lang = args.values.get("--lang");
    const langOpt = lang !== undefined ? { lang } : {};
    switch (args.command) {
      case "validate":
        return validate(ctx, { writeReadme: args.flags.has("--write-readme"), json: args.flags.has("--json") });
      case "list":
        return list(ctx, { ...langOpt, json: args.flags.has("--json") });
      case "run":
        return args.flags.has("--all") ? runAll(ctx, langOpt) : run(ctx, args.positional[0] ?? "", langOpt);
      case "snapshot": {
        const pattern = args.values.get("--pattern");
        return snapshot(ctx, { ...langOpt, update: args.flags.has("--update"), ...(pattern !== undefined ? { pattern } : {}) });
      }
      case "check":
        return check(ctx, { json: args.flags.has("--json") });
    }
  } catch (e) {
    if (e instanceof UsageError || e instanceof CatalogError) {
      options.io.error(e.message + "\n");
      return 1;
    }
    throw e;
  }
}
