import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Context } from "../context.ts";
import { listExamples } from "../languages.ts";
import { currentSection, renderCatalogue, splice } from "../readme.ts";
import { readSnapshot } from "../snapshots.ts";
import { checkOneClassPerFile } from "../structure.ts";

export interface ValidateOptions {
  readonly writeReadme?: boolean;
  readonly json?: boolean;
}

/** Every language is migrated (Phase 4, spec 033): a file breaking the one-class-per-file rule fails validation. */
export const ONE_CLASS_PER_FILE_LEVEL: "warning" | "error" = "error";

export interface ValidationFinding {
  readonly level: "error" | "warning" | "info";
  readonly pattern?: string;
  readonly language?: string;
  readonly message: string;
}

/** The first fenced block after a `## The example` heading, or null. */
export function expectedOutputBlock(markdown: string): string | null {
  const lines = markdown.split("\n");
  const start = lines.findIndex((l) => l.startsWith("## The example"));
  if (start < 0) {
    return null;
  }
  const open = lines.findIndex((l, i) => i > start && l.startsWith("```"));
  if (open < 0) {
    return null;
  }
  const close = lines.findIndex((l, i) => i > open && l.startsWith("```"));
  if (close < 0) {
    return null;
  }
  const body = lines.slice(open + 1, close);
  return body.length === 0 ? "" : body.join("\n") + "\n";
}

export function validate(ctx: Context, options: ValidateOptions): number {
  const findings: ValidationFinding[] = [];
  const error = (message: string, pattern?: string, language?: string): void => {
    findings.push({ level: "error", message, ...(pattern !== undefined ? { pattern } : {}), ...(language !== undefined ? { language } : {}) });
  };

  const declared = new Map<string, Set<string>>(ctx.catalog.languages.map((l) => [l.id, new Set<string>()]));

  for (const pattern of ctx.catalog.patterns) {
    const implemented = pattern.implementations.size > 0;
    const docPath = join(ctx.root, pattern.doc);
    const docExists = existsSync(docPath);
    if (implemented && !docExists) {
      error(`documentation missing: ${pattern.doc}`, pattern.id);
    }
    for (const [lang, path] of pattern.implementations) {
      declared.get(lang)?.add(pattern.id);
      if (!existsSync(join(ctx.root, path))) {
        error(`implementation path missing: ${path}`, pattern.id, lang);
      }
      if (existsSync(join(ctx.root, path))) {
        for (const f of checkOneClassPerFile(ctx.root, lang, path)) {
          findings.push({ level: ONE_CLASS_PER_FILE_LEVEL, pattern: pattern.id, language: lang, message: `${f.file}: ${f.message}` });
        }
      }
      const snap = readSnapshot(ctx.root, pattern.id, lang);
      if (snap === null) {
        error("snapshot missing", pattern.id, lang);
      } else if (!/^[\t\n\r\x20-\x7E]*$/.test(snap)) {
        findings.push({ level: "warning", pattern: pattern.id, language: lang, message: "snapshot contains non-ASCII characters" });
      }
    }
    if (implemented && docExists) {
      const reference = ctx.catalog.languages.find((l) => pattern.implementations.has(l.id));
      const snap = reference === undefined ? null : readSnapshot(ctx.root, pattern.id, reference.id);
      const block = expectedOutputBlock(readFileSync(docPath, "utf8"));
      if (block === null) {
        error("documentation has no fenced block under '## The example'", pattern.id);
      } else if (snap !== null && block !== snap) {
        error(`documentation output block differs from snapshots/${pattern.id}/${reference?.id ?? ""}.txt`, pattern.id);
      }
    }
  }

  for (const language of ctx.catalog.languages) {
    const listed = listExamples(ctx.root, language);
    if (listed.ids === null) {
      error(listed.error ?? "list failed", undefined, language.id);
      continue;
    }
    const expected = declared.get(language.id) ?? new Set<string>();
    for (const id of expected) {
      if (!listed.ids.includes(id)) {
        error(`declared in catalog but not listed by the language`, id, language.id);
      }
    }
    for (const id of listed.ids) {
      if (!expected.has(id)) {
        error(`listed by the language but not declared in the catalog`, id, language.id);
      }
    }
  }

  const readmePath = join(ctx.root, "README.md");
  const readme = readFileSync(readmePath, "utf8");
  const rendered = renderCatalogue(ctx.catalog, ctx.root);
  const current = currentSection(readme);
  if (current === null) {
    error("README.md is missing the catalogue markers");
  } else if (current !== rendered) {
    if (options.writeReadme === true) {
      writeFileSync(readmePath, splice(readme, rendered));
      findings.push({ level: "info", message: "README catalogue section regenerated" });
    } else {
      error("README catalogue section is stale (run `patterns validate --write-readme`)");
    }
  }

  const errors = findings.filter((f) => f.level === "error").length;
  const warnings = findings.filter((f) => f.level === "warning").length;
  if (options.json === true) {
    ctx.io.write(JSON.stringify({ findings, errors }) + "\n");
  } else {
    for (const f of findings) {
      const where = [f.pattern, f.language].filter((x) => x !== undefined).join("/");
      ctx.io.write(`${f.level}: ${where === "" ? "" : where + ": "}${f.message}\n`);
    }
    ctx.io.write(`validate: ${String(ctx.catalog.patterns.length)} patterns, ${String(errors)} errors, ${String(warnings)} warnings\n`);
  }
  return errors === 0 ? 0 : 1;
}
