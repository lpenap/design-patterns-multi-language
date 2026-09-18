import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { listExamples, runExample, splitCommand } from "./languages.ts";
import { ALPHA, editCatalog, makeRepo, type Repo, setBehaviour } from "../tests/helpers.ts";

let repo: Repo;
beforeEach(() => {
  repo = makeRepo();
});
afterEach(() => {
  repo.dispose();
});

const java = (r: Repo) => r.catalog.languages[0]!;

describe("splitCommand", () => {
  it("splits on whitespace", () => {
    expect(splitCommand("  node  fake-runner.js java ")).toEqual(["node", "fake-runner.js", "java"]);
  });
});

describe("listExamples", () => {
  it("parses the JSON array", () => {
    expect(listExamples(repo.root, java(repo))).toEqual({ language: "java", ids: ["fixture-alpha", "fixture-beta"], error: null });
  });

  it("reports a missing toolchain", () => {
    editCatalog(repo.root, (y) => y.replace("node fake-runner.js java", "definitely-not-a-binary-xyz java"));
    const r = listExamples(repo.root, repo.reload().catalog.languages[0]!);
    expect(r.ids).toBeNull();
    expect(r.error).toMatch(/^toolchain unavailable: /);
  });

  it("reports a failing list command", () => {
    editCatalog(repo.root, (y) => y.replace("node fake-runner.js java", "node fake-runner.js java extra"));
    const r = listExamples(repo.root, repo.reload().catalog.languages[0]!);
    expect(r.error).toMatch(/^list failed \(exit 1\)/);
  });

  it("reports invalid JSON", () => {
    editCatalog(repo.root, (y) => y.replace("node fake-runner.js java", "node -e console.log('nope')"));
    const r = listExamples(repo.root, repo.reload().catalog.languages[0]!);
    expect(r.error).toMatch(/^list printed invalid JSON/);
  });

  it("reports a non-array JSON payload", () => {
    editCatalog(repo.root, (y) => y.replace("node fake-runner.js java", "node -e console.log(JSON.stringify([1]))"));
    const r = listExamples(repo.root, repo.reload().catalog.languages[0]!);
    expect(r.error).toBe("list printed invalid JSON: not a string array");
  });
});

describe("runExample", () => {
  it("captures output on success", () => {
    const r = runExample(repo.root, java(repo), "fixture-alpha");
    expect(r).toMatchObject({ pattern: "fixture-alpha", language: "java", status: "ok", stdout: ALPHA, stderr: "", exitCode: 0 });
  });

  it("maps exit 2 to unknown-example", () => {
    expect(runExample(repo.root, java(repo), "nope")).toMatchObject({ status: "unknown-example", exitCode: 2, stderr: "unknown example: nope\n" });
  });

  it("maps exit 1 to failed", () => {
    setBehaviour(repo.root, (b) => {
      b["java"]!.fail.push("fixture-alpha");
    });
    expect(runExample(repo.root, java(repo), "fixture-alpha")).toMatchObject({ status: "failed", exitCode: 1, stdout: "" });
  });

  it("maps a spawn error to toolchain-unavailable", () => {
    editCatalog(repo.root, (y) => y.replace("node fake-runner.js java", "definitely-not-a-binary-xyz java"));
    const r = runExample(repo.root, repo.reload().catalog.languages[0]!, "fixture-alpha");
    expect(r.status).toBe("toolchain-unavailable");
    expect(r.exitCode).toBeNull();
    expect(r.stderr).toMatch(/ENOENT/);
  });
});
