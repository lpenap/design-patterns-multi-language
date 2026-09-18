import { disagreeingLanguages, firstDifference } from "../compare.ts";
import type { Context } from "../context.ts";
import { runExample } from "../languages.ts";
import { readSnapshot } from "../snapshots.ts";

export interface CheckOptions {
  readonly json?: boolean;
}

export type Outcome = "ok" | "drift" | "missing-snapshot" | "failed" | "mismatch" | "loose-mismatch";

export interface Finding {
  readonly outcome: Outcome;
  readonly pattern: string;
  readonly language?: string;
  readonly languages?: readonly string[];
  readonly message: string;
}

export function check(ctx: Context, options: CheckOptions): number {
  const findings: Finding[] = [];
  const counts = { ok: 0, drift: 0, mismatch: 0, failed: 0 };

  for (const pattern of ctx.catalog.patterns) {
    if (pattern.implementations.size === 0) {
      continue;
    }
    const outputs = new Map<string, string>();
    for (const language of ctx.catalog.languages) {
      if (!pattern.implementations.has(language.id)) {
        continue;
      }
      const result = runExample(ctx.root, language, pattern.id);
      if (result.status !== "ok") {
        counts.failed++;
        findings.push({ outcome: "failed", pattern: pattern.id, language: language.id, message: `${result.status}: ${result.stderr.trim()}` });
        continue;
      }
      outputs.set(language.id, result.stdout);
      const expected = readSnapshot(ctx.root, pattern.id, language.id);
      if (expected === null) {
        counts.failed++;
        findings.push({ outcome: "missing-snapshot", pattern: pattern.id, language: language.id, message: "no snapshot recorded (run `patterns snapshot`)" });
        continue;
      }
      const diff = firstDifference(expected, result.stdout);
      if (diff === null) {
        counts.ok++;
        findings.push({ outcome: "ok", pattern: pattern.id, language: language.id, message: "matches snapshot" });
      } else {
        counts.drift++;
        findings.push({
          outcome: "drift",
          pattern: pattern.id,
          language: language.id,
          message: `line ${String(diff.line)}: expected ${JSON.stringify(diff.expected)}, got ${JSON.stringify(diff.actual)}`,
        });
      }
    }
    const disagreeing = disagreeingLanguages(outputs);
    if (disagreeing.length > 0) {
      if (pattern.parity === "strict") {
        counts.mismatch++;
        findings.push({ outcome: "mismatch", pattern: pattern.id, languages: disagreeing, message: `strict parity: ${disagreeing.join(", ")} disagree` });
      } else {
        findings.push({ outcome: "loose-mismatch", pattern: pattern.id, languages: disagreeing, message: `loose parity: ${disagreeing.join(", ")} differ (allowed)` });
      }
    }
  }

  const summary = `check: ${String(counts.ok)} ok, ${String(counts.drift)} drift, ${String(counts.mismatch)} mismatch, ${String(counts.failed)} failed`;
  if (options.json === true) {
    ctx.io.write(JSON.stringify({ findings, summary }) + "\n");
  } else {
    for (const f of findings) {
      if (f.outcome !== "ok") {
        const where = f.language !== undefined ? `${f.pattern}/${f.language}` : f.pattern;
        ctx.io.write(`${f.outcome}: ${where}: ${f.message}\n`);
      }
    }
    ctx.io.write(summary + "\n");
  }
  return counts.drift + counts.mismatch + counts.failed === 0 ? 0 : 1;
}
