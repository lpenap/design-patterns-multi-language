import { findPattern, type Pattern } from "../catalog.ts";
import { type Context, heading, selectLanguages, UsageError } from "../context.ts";
import { notImplemented, runExample, type RunResult } from "../languages.ts";

export interface RunOptions {
  readonly lang?: string;
}

export function renderBlock(ctx: Context, result: RunResult): string {
  const name = ctx.catalog.languages.find((l) => l.id === result.language)?.name ?? result.language;
  switch (result.status) {
    case "ok":
      return heading(name) + result.stdout;
    case "not-implemented":
      return heading(name) + "(not implemented)\n";
    case "toolchain-unavailable":
      return heading(name) + "(toolchain unavailable)\n" + result.stderr;
    case "unknown-example":
      return heading(name) + "(unknown to this language, exit 2)\n" + result.stderr;
    case "failed":
      return heading(name) + `(failed, exit ${String(result.exitCode)})\n` + result.stderr;
  }
}

/** Runs one pattern in the selected languages; returns the results in catalog order. */
export function runPattern(ctx: Context, pattern: Pattern, lang: string | undefined): readonly RunResult[] {
  return selectLanguages(ctx, lang).map((l) =>
    pattern.implementations.has(l.id) ? runExample(ctx.root, l, pattern.id) : notImplemented(pattern.id, l),
  );
}

function isAcceptable(r: RunResult): boolean {
  return r.status === "ok" || r.status === "not-implemented";
}

export function run(ctx: Context, id: string, options: RunOptions): number {
  const pattern = findPattern(ctx.catalog, id);
  if (pattern === undefined) {
    throw new UsageError(`not in catalog: ${id}`);
  }
  const results = runPattern(ctx, pattern, options.lang);
  ctx.io.write(results.map((r) => renderBlock(ctx, r)).join("\n"));
  return results.every(isAcceptable) ? 0 : 1;
}

export function runAll(ctx: Context, options: RunOptions): number {
  let ok = true;
  const implemented = ctx.catalog.patterns.filter((p) => p.implementations.size > 0);
  implemented.forEach((pattern, i) => {
    const results = runPattern(ctx, pattern, options.lang);
    ctx.io.write(`${i > 0 ? "\n" : ""}## ${pattern.id}\n\n` + results.map((r) => renderBlock(ctx, r)).join("\n"));
    ok = ok && results.every(isAcceptable);
  });
  return ok ? 0 : 1;
}
