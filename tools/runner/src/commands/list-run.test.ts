import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { list } from "./list.ts";
import { run, runAll } from "./run.ts";
import { UsageError } from "../context.ts";
import { ALPHA, editCatalog, invocations, makeRepo, type Repo, setBehaviour } from "../../tests/helpers.ts";

let repo: Repo;
beforeEach(() => {
  repo = makeRepo();
});
afterEach(() => {
  repo.dispose();
});

describe("list (US1 via orchestrator)", () => {
  it("groups ids by language in catalog order", () => {
    expect(list(repo.ctx, {})).toBe(0);
    expect(repo.out()).toBe(
      "Java: fixture-alpha, fixture-beta\nPython: fixture-alpha, fixture-beta\nTypeScript: fixture-alpha, fixture-beta\nJavaScript: fixture-alpha, fixture-beta\n",
    );
  });

  it("filters by --lang and supports --json and (none)", () => {
    setBehaviour(repo.root, (b) => {
      b["python"]!.examples = {};
    });
    expect(list(repo.ctx, { lang: "python" })).toBe(0);
    expect(repo.out()).toBe("Python: (none)\n");
    expect(list(repo.ctx, { lang: "java", json: true })).toBe(0);
    expect(repo.out()).toContain('{"java":["fixture-alpha","fixture-beta"]}\n');
  });

  it("fails when a language cannot answer", () => {
    editCatalog(repo.root, (y) => y.replace("node fake-runner.js java", "definitely-not-a-binary-xyz java"));
    expect(list(repo.reload(), {})).toBe(1);
    expect(repo.out()).toMatch(/^Java: error: toolchain unavailable/);
  });

  it("rejects an unknown --lang", () => {
    expect(() => list(repo.ctx, { lang: "rust" })).toThrow(UsageError);
  });
});

describe("run <id> (US4)", () => {
  it("renders one headed block per language in catalog order", () => {
    expect(run(repo.ctx, "fixture-alpha", {})).toBe(0);
    expect(repo.out()).toBe(
      ["== Java ==\n" + ALPHA, "== Python ==\n" + ALPHA, "== TypeScript ==\n" + ALPHA, "== JavaScript ==\n" + ALPHA].join("\n"),
    );
  });

  it("shows (not implemented) for a pattern without implementations and succeeds", () => {
    expect(run(repo.ctx, "fixture-gamma", {})).toBe(0);
    expect(repo.out()).toBe(
      "== Java ==\n(not implemented)\n\n== Python ==\n(not implemented)\n\n== TypeScript ==\n(not implemented)\n\n== JavaScript ==\n(not implemented)\n",
    );
    expect(invocations(repo.root)).toBe("");
  });

  it("refuses an id that is not in the catalog before spawning anything", () => {
    expect(() => run(repo.ctx, "strategy", {})).toThrow("not in catalog: strategy");
    expect(invocations(repo.root)).toBe("");
  });

  it("reports a missing toolchain and fails", () => {
    editCatalog(repo.root, (y) => y.replace("node fake-runner.js python", "definitely-not-a-binary-xyz python"));
    expect(run(repo.reload(), "fixture-alpha", { lang: "python" })).toBe(1);
    expect(repo.out()).toMatch(/^== Python ==\n\(toolchain unavailable\)\n.*ENOENT/);
  });

  it("reports a failing example with its stderr and fails", () => {
    setBehaviour(repo.root, (b) => {
      b["java"]!.fail.push("fixture-alpha");
    });
    expect(run(repo.ctx, "fixture-alpha", { lang: "java" })).toBe(1);
    expect(repo.out()).toBe("== Java ==\n(failed, exit 1)\nexample failed: fixture-alpha: boom\n");
  });

  it("reports a language that does not know a declared id", () => {
    setBehaviour(repo.root, (b) => {
      delete b["java"]!.examples["fixture-alpha"];
    });
    expect(run(repo.ctx, "fixture-alpha", { lang: "java" })).toBe(1);
    expect(repo.out()).toBe("== Java ==\n(unknown to this language, exit 2)\nunknown example: fixture-alpha\n");
  });
});

describe("run --all (US4)", () => {
  it("runs every implemented pattern with a heading per pattern", () => {
    expect(runAll(repo.ctx, { lang: "java" })).toBe(0);
    expect(repo.out()).toBe(
      "## fixture-alpha\n\n== Java ==\n" + ALPHA + "\n## fixture-beta\n\n== Java ==\nExecuting Fixture Beta Pattern Implementation\n  java\n",
    );
  });

  it("fails if any language fails", () => {
    setBehaviour(repo.root, (b) => {
      b["javascript"]!.fail.push("fixture-beta");
    });
    expect(runAll(repo.ctx, {})).toBe(1);
  });
});
