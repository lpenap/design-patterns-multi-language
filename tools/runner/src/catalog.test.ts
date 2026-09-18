import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CatalogError, findLanguage, findPattern, findRoot, loadCatalog } from "./catalog.ts";
import { editCatalog, makeRepo, type Repo } from "../tests/helpers.ts";

let repo: Repo;
beforeEach(() => {
  repo = makeRepo();
});
afterEach(() => {
  repo.dispose();
});

describe("loadCatalog", () => {
  it("loads languages, categories and patterns in order", () => {
    const c = repo.catalog;
    expect(c.languages.map((l) => l.id)).toEqual(["java", "python", "typescript", "javascript"]);
    expect(c.categories.map((x) => x.id)).toEqual(["creational", "concurrency"]);
    expect(c.patterns.map((p) => p.id)).toEqual(["fixture-alpha", "fixture-beta", "fixture-gamma"]);
    expect(findPattern(c, "fixture-gamma")?.parity).toBe("strict");
    expect(findPattern(c, "fixture-beta")?.parity).toBe("loose");
    expect(findPattern(c, "fixture-alpha")?.implementations.get("java")).toBe("java/alpha");
    expect(findLanguage(c, "python")?.name).toBe("Python");
    expect(findLanguage(c, "nope")).toBeUndefined();
  });

  it.each([
    ["version: 1", "version: 2", "version must be 1"],
    ["id: fixture-gamma", "id: Fixture_Gamma", "not kebab-case"],
    ["id: fixture-gamma", "id: fixture-alpha", 'duplicate id "fixture-alpha"'],
    ["category: concurrency", "category: nowhere", 'unknown category "nowhere"'],
    ["parity: loose", "parity: sometimes", "parity must be strict or loose"],
    ["      javascript: javascript/beta", "      rust: rust/beta", 'unknown language "rust"'],
    ["intent: Not implemented anywhere.", "intent: ''", "intent must be a non-empty string"],
    ["  - { id: concurrency, name: Concurrency constructs }", "  - { id: creational, name: Again }", "duplicate category id"],
  ])("rejects %s → %s", (from, to, message) => {
    editCatalog(repo.root, (y) => y.replace(from, to));
    expect(() => loadCatalog(repo.root, { allowFixtureIds: true })).toThrow(message);
  });

  it("rejects the reserved fixture- prefix unless allowed", () => {
    expect(() => loadCatalog(repo.root)).toThrow(CatalogError);
    expect(() => loadCatalog(repo.root)).toThrow("reserved fixture- prefix");
  });

  it("requires categories to be a list", () => {
    writeFileSync(join(repo.root, "catalog.yaml"), "version: 1\nlanguages: { java: { name: Java, dir: java, run: x } }\ncategories: 3\npatterns: []\n");
    expect(() => loadCatalog(repo.root)).toThrow("categories must be a list");
  });

  it("requires at least one language", () => {
    writeFileSync(join(repo.root, "catalog.yaml"), "version: 1\nlanguages: {}\ncategories: []\npatterns: []\n");
    expect(() => loadCatalog(repo.root)).toThrow("at least one language is required");
  });

  it("rejects a non-mapping document", () => {
    writeFileSync(join(repo.root, "catalog.yaml"), "- just\n- a list\n");
    expect(() => loadCatalog(repo.root)).toThrow("catalog must be a mapping");
  });
});

describe("findRoot", () => {
  it("walks up to the directory holding catalog.yaml", () => {
    const nested = join(repo.root, "java", "alpha", "deep");
    mkdirSync(nested, { recursive: true });
    expect(findRoot(nested)).toBe(repo.root);
    expect(findRoot(repo.root)).toBe(repo.root);
  });

  it("fails when no catalog exists above", () => {
    expect(() => findRoot("/")).toThrow("no catalog.yaml found");
  });
});
