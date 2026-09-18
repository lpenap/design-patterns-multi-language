import { existsSync, rmSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { check } from "./check.ts";
import { snapshot } from "./snapshot.ts";
import { readSnapshot, snapshotPath, writeSnapshot } from "../snapshots.ts";
import { ALPHA, editCatalog, makeRepo, type Repo, setBehaviour } from "../../tests/helpers.ts";

let repo: Repo;
beforeEach(() => {
  repo = makeRepo();
});
afterEach(() => {
  repo.dispose();
});

describe("snapshot (US5)", () => {
  it("writes one file per declared implementation with the exact output", () => {
    expect(snapshot(repo.ctx, {})).toBe(0);
    expect(readSnapshot(repo.root, "fixture-alpha", "java")).toBe(ALPHA);
    expect(readSnapshot(repo.root, "fixture-beta", "python")).toBe("Executing Fixture Beta Pattern Implementation\n  python\n");
    expect(existsSync(snapshotPath(repo.root, "fixture-gamma", "java"))).toBe(false);
    expect(repo.out()).toContain("fixture-alpha/java: written\n");
    expect(repo.out().split("\n").filter((l) => l.endsWith("written")).length).toBe(8);
  });

  it("writes an empty file for an example with no output", () => {
    setBehaviour(repo.root, (b) => {
      b["java"]!.examples["fixture-alpha"] = [];
    });
    expect(snapshot(repo.ctx, { lang: "java", pattern: "fixture-alpha" })).toBe(0);
    expect(readSnapshot(repo.root, "fixture-alpha", "java")).toBe("");
  });

  it("reports unchanged, skipped and updated", () => {
    snapshot(repo.ctx, { pattern: "fixture-alpha" });
    expect(snapshot(repo.ctx, { pattern: "fixture-alpha", lang: "java" })).toBe(0);
    expect(repo.out()).toContain("fixture-alpha/java: unchanged\n");
    setBehaviour(repo.root, (b) => {
      b["java"]!.examples["fixture-alpha"] = ["changed"];
    });
    expect(snapshot(repo.ctx, { pattern: "fixture-alpha", lang: "java" })).toBe(1);
    expect(repo.out()).toContain("fixture-alpha/java: skipped (use --update)\n");
    expect(readSnapshot(repo.root, "fixture-alpha", "java")).toBe(ALPHA);
    expect(snapshot(repo.ctx, { pattern: "fixture-alpha", lang: "java", update: true })).toBe(0);
    expect(repo.out()).toContain("fixture-alpha/java: updated\n");
    expect(readSnapshot(repo.root, "fixture-alpha", "java")).toBe("changed\n");
  });

  it("does not write and fails when the run fails", () => {
    setBehaviour(repo.root, (b) => {
      b["java"]!.fail.push("fixture-alpha");
    });
    expect(snapshot(repo.ctx, { pattern: "fixture-alpha", lang: "java" })).toBe(1);
    expect(repo.out()).toBe("fixture-alpha/java: failed (failed)\n");
    expect(readSnapshot(repo.root, "fixture-alpha", "java")).toBeNull();
  });

  it("rejects an unknown --pattern", () => {
    expect(() => snapshot(repo.ctx, { pattern: "fixture-gamma" })).toThrow("not in catalog or not implemented");
  });
});

describe("check (US5)", () => {
  it("passes when everything matches and reports loose differences as information", () => {
    snapshot(repo.ctx, {});
    expect(check(repo.ctx, {})).toBe(0);
    expect(repo.out()).toContain("loose-mismatch: fixture-beta: loose parity: java, python, typescript, javascript differ (allowed)\n");
    expect(repo.out()).toContain("check: 8 ok, 0 drift, 0 mismatch, 0 failed\n");
  });

  it("passes with nothing to compare", () => {
    editCatalog(repo.root, (y) => y.replace(/implementations:\n( {6}\w+: \w+\/\w+\n)+/g, "implementations: {}\n"));
    expect(check(repo.reload(), {})).toBe(0);
    expect(repo.out()).toBe("check: 0 ok, 0 drift, 0 mismatch, 0 failed\n");
  });

  it("names pattern, language and first differing line on drift", () => {
    snapshot(repo.ctx, {});
    setBehaviour(repo.root, (b) => {
      b["python"]!.examples["fixture-alpha"] = ["Executing Fixture Alpha Pattern Implementation", "  changed", "  second"];
    });
    expect(check(repo.ctx, {})).toBe(1);
    expect(repo.out()).toContain('drift: fixture-alpha/python: line 2: expected "  first", got "  changed"\n');
    expect(repo.out()).toContain("mismatch: fixture-alpha: strict parity: java, python disagree\n");
    expect(repo.out()).toContain("check: 7 ok, 1 drift, 1 mismatch, 0 failed\n");
  });

  it("fails on a strict mismatch even when every language matches its own snapshot", () => {
    setBehaviour(repo.root, (b) => {
      b["javascript"]!.examples["fixture-alpha"] = ["different"];
    });
    snapshot(repo.ctx, {});
    expect(check(repo.ctx, {})).toBe(1);
    expect(repo.out()).toContain("mismatch: fixture-alpha: strict parity: java, javascript disagree\n");
    expect(repo.out()).toContain("check: 8 ok, 0 drift, 1 mismatch, 0 failed\n");
  });

  it("fails on a missing snapshot, a failing run and a missing toolchain", () => {
    snapshot(repo.ctx, {});
    writeSnapshot(repo.root, "fixture-alpha", "java", ALPHA);
    setBehaviour(repo.root, (b) => {
      b["python"]!.fail.push("fixture-beta");
    });
    editCatalog(repo.root, (y) => y.replace("node fake-runner.js typescript", "definitely-not-a-binary-xyz typescript"));
    const ctx = repo.reload();
    rmSync(snapshotPath(repo.root, "fixture-beta", "javascript"));
    expect(check(ctx, {})).toBe(1);
    expect(repo.out()).toContain("missing-snapshot: fixture-beta/javascript: no snapshot recorded");
    expect(repo.out()).toContain("failed: fixture-beta/python: failed: example failed: fixture-beta: boom\n");
    expect(repo.out()).toContain("failed: fixture-alpha/typescript: toolchain-unavailable:");
    expect(repo.out()).toMatch(/check: 4 ok, 0 drift, 0 mismatch, 4 failed\n$/);
  });

  it("supports --json", () => {
    snapshot(repo.ctx, {});
    expect(check(repo.ctx, { json: true })).toBe(0);
    const parsed = JSON.parse(repo.out().split("\n").at(-2) ?? "") as { summary: string; findings: unknown[] };
    expect(parsed.summary).toBe("check: 8 ok, 0 drift, 0 mismatch, 0 failed");
    expect(parsed.findings).toHaveLength(9);
  });
});
