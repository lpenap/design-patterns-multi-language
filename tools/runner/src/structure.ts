import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, extname, join, relative } from "node:path";

/** A file that breaks the one-class-per-file rule. */
export interface StructureFinding {
  /** repository-relative path */
  readonly file: string;
  readonly message: string;
}

interface LanguageRule {
  readonly extension: string;
  /** matches a top-level declaration at column 0 and captures its name */
  readonly declaration: RegExp;
  readonly expectedFileName: (declared: string) => string;
  /** files never scanned (tests, helpers, package files) */
  readonly skip: (fileName: string) => boolean;
  /** files exempt from the name check (the example has a fixed name) */
  readonly exemptFromName: (fileName: string) => boolean;
}

function separate(name: string, sep: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, `$1${sep}$2`).toLowerCase();
}

const RULES: Record<string, LanguageRule> = {
  java: {
    extension: ".java",
    declaration: /^(?:public\s+|protected\s+|private\s+)?(?:abstract\s+|final\s+|static\s+|sealed\s+)*(?:class|interface|enum|record)\s+(\w+)/,
    expectedFileName: (d) => `${d}.java`,
    skip: () => false,
    exemptFromName: () => false,
  },
  python: {
    extension: ".py",
    declaration: /^class\s+(\w+)/,
    expectedFileName: (d) => `${separate(d, "_")}.py`,
    skip: (f) => f.startsWith("test_"),
    exemptFromName: (f) => f === "example.py",
  },
  typescript: {
    extension: ".ts",
    declaration: /^(?:export\s+)?(?:abstract\s+)?(?:class|interface)\s+(\w+)/,
    expectedFileName: (d) => `${separate(d, "-")}.ts`,
    skip: (f) => f.endsWith(".test.ts") || f.endsWith(".test-helper.ts"),
    exemptFromName: (f) => f === "example.ts",
  },
  javascript: {
    extension: ".js",
    declaration: /^(?:export\s+)?class\s+(\w+)/,
    expectedFileName: (d) => `${separate(d, "-")}.js`,
    skip: (f) => f.endsWith(".test.js") || f.endsWith(".test-helper.js"),
    exemptFromName: (f) => f === "example.js",
  },
};

export function hasStructureRule(language: string): boolean {
  return language in RULES;
}

function sourceFiles(dir: string, extension: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      files.push(...sourceFiles(path, extension));
    } else if (extname(entry) === extension) {
      files.push(path);
    }
  }
  return files.sort();
}

/** Top-level declarations in one file, in order of appearance. */
export function topLevelDeclarations(source: string, language: string): readonly string[] {
  const rule = RULES[language];
  if (rule === undefined) {
    return [];
  }
  const names: string[] = [];
  for (const line of source.split("\n")) {
    const match = rule.declaration.exec(line);
    if (match?.[1] !== undefined) {
      names.push(match[1]);
    }
  }
  return names;
}

/**
 * Checks every source file under an implementation path: one top-level
 * declaration per file, and a file name derived from the declared name.
 */
export function checkOneClassPerFile(root: string, language: string, implementationPath: string): readonly StructureFinding[] {
  const rule = RULES[language];
  if (rule === undefined) {
    return [];
  }
  const findings: StructureFinding[] = [];
  for (const file of sourceFiles(join(root, implementationPath), rule.extension)) {
    const name = basename(file);
    if (rule.skip(name)) {
      continue;
    }
    const declared = topLevelDeclarations(readFileSync(file, "utf8"), language);
    const rel = relative(root, file);
    if (name === "__init__.py") {
      if (declared.length > 0) {
        findings.push({ file: rel, message: `${String(declared.length)} class(es) declared in the package file (${declared.join(", ")}); classes belong in their own modules, __init__.py only re-exports` });
      }
      continue;
    }
    if (declared.length > 1) {
      findings.push({ file: rel, message: `${String(declared.length)} top-level declarations (${declared.join(", ")}); expected one per file` });
    } else if (declared.length === 1 && !rule.exemptFromName(name)) {
      const expected = rule.expectedFileName(declared[0] ?? "");
      if (expected !== name) {
        findings.push({ file: rel, message: `declares ${declared[0] ?? ""}; expected file name ${expected}` });
      }
    }
  }
  return findings;
}
