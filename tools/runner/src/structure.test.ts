import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { checkOneClassPerFile, hasStructureRule, topLevelDeclarations } from "./structure.ts";
import { makeRepo, type Repo } from "../tests/helpers.ts";

let repo: Repo;
beforeEach(() => {
  repo = makeRepo();
});
afterEach(() => {
  repo.dispose();
});

describe("topLevelDeclarations", () => {
  it("finds column-0 declarations only", () => {
    expect(topLevelDeclarations("public final class A {\n    static class B {}\n}\n", "java")).toEqual(["A"]);
    expect(topLevelDeclarations("class X:\n    class Inner:\n        pass\nclass Y:\n    pass\n", "python")).toEqual(["X", "Y"]);
    expect(topLevelDeclarations("export interface I {}\nexport abstract class C {}\nconst k = 1;\n", "typescript")).toEqual(["I", "C"]);
    expect(topLevelDeclarations("class P {}\nexport class Q {}\n", "javascript")).toEqual(["P", "Q"]);
    expect(topLevelDeclarations("class X {}", "rust")).toEqual([]);
    expect(hasStructureRule("rust")).toBe(false);
  });
});

describe("checkOneClassPerFile", () => {
  it("reports a module with two classes and a misnamed file, accepts good names, nested types and examples", () => {
    const python = checkOneClassPerFile(repo.root, "python", "python/alpha");
    expect(python).toEqual([
      { file: "python/alpha/__init__.py", message: "1 class(es) declared in the package file (InPackageFile); classes belong in their own modules, __init__.py only re-exports" },
      { file: "python/alpha/pair.py", message: "2 top-level declarations (First, Second); expected one per file" },
    ]);
    const ts = checkOneClassPerFile(repo.root, "typescript", "typescript/alpha");
    expect(ts).toEqual([{ file: "typescript/alpha/wrong-name.ts", message: "declares Right; expected file name right.ts" }]);
    expect(checkOneClassPerFile(repo.root, "java", "java/alpha")).toEqual([]);
    expect(checkOneClassPerFile(repo.root, "javascript", "javascript/alpha")).toEqual([]);
    expect(checkOneClassPerFile(repo.root, "rust", "java/alpha")).toEqual([]);
  });
});
