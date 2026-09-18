import { type Context, selectLanguages, UsageError } from "../context.ts";
import { runExample } from "../languages.ts";
import { readSnapshot, writeSnapshot } from "../snapshots.ts";

export interface SnapshotOptions {
  readonly update?: boolean;
  readonly lang?: string;
  readonly pattern?: string;
}

export type SnapshotOutcome = "written" | "unchanged" | "updated" | "skipped" | "failed";

export function snapshot(ctx: Context, options: SnapshotOptions): number {
  const languages = selectLanguages(ctx, options.lang);
  let patterns = ctx.catalog.patterns.filter((p) => p.implementations.size > 0);
  if (options.pattern !== undefined) {
    patterns = patterns.filter((p) => p.id === options.pattern);
    if (patterns.length === 0) {
      throw new UsageError(`not in catalog or not implemented: ${options.pattern}`);
    }
  }
  let ok = true;
  for (const pattern of patterns) {
    for (const language of languages) {
      if (!pattern.implementations.has(language.id)) {
        continue;
      }
      const result = runExample(ctx.root, language, pattern.id);
      let outcome: SnapshotOutcome;
      if (result.status !== "ok") {
        outcome = "failed";
      } else {
        const existing = readSnapshot(ctx.root, pattern.id, language.id);
        if (existing === null) {
          writeSnapshot(ctx.root, pattern.id, language.id, result.stdout);
          outcome = "written";
        } else if (existing === result.stdout) {
          outcome = "unchanged";
        } else if (options.update === true) {
          writeSnapshot(ctx.root, pattern.id, language.id, result.stdout);
          outcome = "updated";
        } else {
          outcome = "skipped";
        }
      }
      ok = ok && outcome !== "failed" && outcome !== "skipped";
      const note = outcome === "skipped" ? " (use --update)" : outcome === "failed" ? ` (${result.status})` : "";
      ctx.io.write(`${pattern.id}/${language.id}: ${outcome}${note}\n`);
    }
  }
  return ok ? 0 : 1;
}
