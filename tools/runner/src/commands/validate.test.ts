import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { snapshot } from "./snapshot.ts";
import { expectedOutputBlock, validate } from "./validate.ts";
import { snapshotPath } from "../snapshots.ts";
import { editCatalog, makeRepo, type Repo, setBehaviour } from "../../tests/helpers.ts";

let repo: Repo;
beforeEach(() => {
  repo = makeRepo();
});
afterEach(() => {
  repo.dispose();
});

function ready(r: Repo): void {
  snapshot(r.ctx, {});
  validate(r.ctx, { writeReadme: true });
}

describe("expectedOutputBlock", () => {
  it("extracts the first fenced block after the heading", () => {
    expect(expectedOutputBlock("# T\n\n## The example\n\ntext\n\n```\na\n  b\n```\n\n## Next\n")).toBe("a\n  b\n");
    expect(expectedOutputBlock("## The example\n```\n```\n")).toBe("");
  });
  it("returns null without heading or block", () => {
    expect(expectedOutputBlock("# T\n")).toBeNull();
    expect(expectedOutputBlock("## The example\nno block\n")).toBeNull();
    expect(expectedOutputBlock("## The example\n```\nunterminated\n")).toBeNull();
  });
});

describe("validate (US5)", () => {
  it("passes on a consistent repository and reports structure findings as warnings", () => {
    ready(repo);
    expect(validate(repo.ctx, {})).toBe(0);
    expect(repo.out()).toContain("warning: fixture-alpha/python: python/alpha/pair.py: 2 top-level declarations (First, Second); expected one per file\n");
    expect(repo.out()).toContain("warning: fixture-alpha/typescript: typescript/alpha/wrong-name.ts: declares Right; expected file name right.ts\n");
    expect(repo.out()).toMatch(/validate: 3 patterns, 0 errors, 3 warnings\n$/);
  });

  it("regenerates a stale README only with --write-readme", () => {
    snapshot(repo.ctx, {});
    expect(validate(repo.ctx, {})).toBe(1);
    expect(repo.out()).toContain("error: README catalogue section is stale (run `patterns validate --write-readme`)\n");
    expect(validate(repo.ctx, { writeReadme: true })).toBe(0);
    expect(repo.out()).toContain("info: README catalogue section regenerated\n");
    const readme = readFileSync(join(repo.root, "README.md"), "utf8");
    expect(readme).toMatch(/^# Fixture repo\n\nIntro text\.\n\n<!-- catalogue:start -->\n### Creational\n/);
    expect(readme).toMatch(/\| done \| done \| done \| done \|\n<!-- catalogue:end -->\n\nOutro text\.\n$/);
  });

  it("reports a missing doc only for implemented patterns", () => {
    ready(repo);
    rmSync(join(repo.root, "docs/patterns/fixture-alpha.md"));
    expect(validate(repo.ctx, {})).toBe(1);
    expect(repo.out()).toContain("error: fixture-alpha: documentation missing: docs/patterns/fixture-alpha.md\n");
    expect(repo.out()).not.toContain("fixture-gamma: documentation missing");
  });

  it("reports a missing implementation path and a missing snapshot", () => {
    ready(repo);
    rmSync(join(repo.root, "java/alpha"), { recursive: true });
    rmSync(snapshotPath(repo.root, "fixture-alpha", "python"));
    expect(validate(repo.ctx, {})).toBe(1);
    expect(repo.out()).toContain("error: fixture-alpha/java: implementation path missing: java/alpha\n");
    expect(repo.out()).toContain("error: fixture-alpha/python: snapshot missing\n");
  });

  it("reports catalog/list disagreements in both directions and a language that cannot answer", () => {
    ready(repo);
    setBehaviour(repo.root, (b) => {
      delete b["java"]!.examples["fixture-beta"];
      b["python"]!.examples["fixture-extra"] = ["x"];
    });
    editCatalog(repo.root, (y) => y.replace("node fake-runner.js typescript", "definitely-not-a-binary-xyz typescript"));
    expect(validate(repo.reload(), {})).toBe(1);
    expect(repo.out()).toContain("error: fixture-beta/java: declared in catalog but not listed by the language\n");
    expect(repo.out()).toContain("error: fixture-extra/python: listed by the language but not declared in the catalog\n");
    expect(repo.out()).toMatch(/error: typescript: toolchain unavailable/);
  });

  it("compares the doc's expected output with the reference snapshot", () => {
    ready(repo);
    const doc = join(repo.root, "docs/patterns/fixture-alpha.md");
    writeFileSync(doc, readFileSync(doc, "utf8").replace("  first", "  changed"));
    expect(validate(repo.ctx, {})).toBe(1);
    expect(repo.out()).toContain("error: fixture-alpha: documentation output block differs from snapshots/fixture-alpha/java.txt\n");
    writeFileSync(doc, "# No block\n\n## The example\n\nnothing fenced\n");
    expect(validate(repo.ctx, {})).toBe(1);
    expect(repo.out()).toContain("error: fixture-alpha: documentation has no fenced block under '## The example'\n");
  });

  it("warns on non-ASCII snapshot content without failing", () => {
    ready(repo);
    setBehaviour(repo.root, (b) => {
      b["javascript"]!.examples["fixture-beta"] = ["Executing Fixture Beta Pattern Implementation", "  jävä"];
    });
    snapshot(repo.ctx, { update: true, pattern: "fixture-beta", lang: "javascript" });
    const before = repo.out().length;
    expect(validate(repo.ctx, {})).toBe(0);
    expect(repo.out().slice(before)).toContain("warning: fixture-beta/javascript: snapshot contains non-ASCII characters\n");
  });

  it("reports missing README markers and supports --json", () => {
    ready(repo);
    writeFileSync(join(repo.root, "README.md"), "no markers\n");
    expect(validate(repo.ctx, { json: true })).toBe(1);
    const parsed = JSON.parse(repo.out().trim().split("\n").at(-1) ?? "") as { errors: number; findings: { level: string; message: string }[] };
    expect(parsed.errors).toBe(1);
    expect(parsed.findings.filter((f) => f.level === "error").map((f) => f.message)).toEqual(["README.md is missing the catalogue markers"]);
  });
});
