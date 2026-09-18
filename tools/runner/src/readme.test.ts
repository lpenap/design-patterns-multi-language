import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { loadCatalog } from "./catalog.ts";
import { currentSection, END, renderCatalogue, splice, START } from "./readme.ts";
import { writeSnapshot } from "./snapshots.ts";
import { makeRepo, type Repo } from "../tests/helpers.ts";

let repo: Repo | undefined;
afterEach(() => {
  repo?.dispose();
  repo = undefined;
});

const REAL_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

describe("renderCatalogue", () => {
  it("renders one table per category with a status column per language", () => {
    repo = makeRepo();
    writeSnapshot(repo.root, "fixture-alpha", "java", "x\n");
    const text = renderCatalogue(repo.catalog, repo.root);
    expect(text).toBe(
      [
        "### Creational",
        "",
        "| | Pattern | Intent | Java | Python | TypeScript | JavaScript |",
        "|---|---|---|---|---|---|---|",
        "| A | [Fixture Alpha](docs/patterns/fixture-alpha.md) | First fixture. | done | pending | pending | pending |",
        "| G | [Fixture Gamma](docs/patterns/fixture-gamma.md) | Not implemented anywhere. | pending | pending | pending | pending |",
        "",
        "### Concurrency constructs",
        "",
        "| | Construct | Problem | Java | Python | TypeScript | JavaScript |",
        "|---|---|---|---|---|---|---|",
        "| B | [Fixture Beta](docs/patterns/fixture-beta.md) | Second fixture, loose parity. | pending | pending | pending | pending |",
        "",
      ].join("\n"),
    );
  });

  it("reproduces the committed README section of the real repository exactly", () => {
    const catalog = loadCatalog(REAL_ROOT);
    const readme = readFileSync(join(REAL_ROOT, "README.md"), "utf8");
    expect(currentSection(readme)).toBe(renderCatalogue(catalog, REAL_ROOT));
  });
});

describe("splice / currentSection", () => {
  it("replaces only the text between the markers", () => {
    const readme = `intro\n${START}\nold\n${END}\noutro\n`;
    expect(splice(readme, "new\n")).toBe(`intro\n${START}\nnew\n${END}\noutro\n`);
    expect(currentSection(readme)).toBe("old\n");
  });
  it("fails without markers", () => {
    expect(() => splice("nothing", "x")).toThrow("missing");
    expect(currentSection("nothing")).toBeNull();
    expect(currentSection(`${END}\n${START}`)).toBeNull();
  });
});
