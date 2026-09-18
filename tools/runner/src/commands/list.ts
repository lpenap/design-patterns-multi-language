import { listExamples } from "../languages.ts";
import { type Context, selectLanguages } from "../context.ts";

export interface ListOptions {
  readonly lang?: string;
  readonly json?: boolean;
}

export function list(ctx: Context, options: ListOptions): number {
  const results = selectLanguages(ctx, options.lang).map((l) => ({ language: l, result: listExamples(ctx.root, l) }));
  if (options.json === true) {
    const obj: Record<string, readonly string[] | null> = {};
    for (const r of results) {
      obj[r.language.id] = r.result.ids;
    }
    ctx.io.write(JSON.stringify(obj) + "\n");
  } else {
    for (const r of results) {
      const text = r.result.ids === null ? `error: ${r.result.error ?? ""}` : r.result.ids.length === 0 ? "(none)" : r.result.ids.join(", ");
      ctx.io.write(`${r.language.name}: ${text}\n`);
    }
  }
  return results.every((r) => r.result.ids !== null) ? 0 : 1;
}
