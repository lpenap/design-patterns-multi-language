import { afterEach, describe, expect, it } from "vitest";
import { parseArgs, USAGE } from "./args.ts";
import { loadCatalog } from "./catalog.ts";
import { main } from "./main.ts";
import { snapshot } from "./commands/snapshot.ts";
import { ALPHA, makeRepo, type Repo } from "../tests/helpers.ts";

describe("parseArgs", () => {
  it("parses commands, flags and values", () => {
    const a = parseArgs(["snapshot", "--update", "--lang", "java", "--pattern", "x"]);
    expect(a.command).toBe("snapshot");
    expect([...a.flags]).toEqual(["--update"]);
    expect(a.values.get("--lang")).toBe("java");
    expect(a.values.get("--pattern")).toBe("x");
    expect(parseArgs(["run", "strategy"]).positional).toEqual(["strategy"]);
    expect(parseArgs(["run", "--all"]).flags.has("--all")).toBe(true);
  });

  it.each([
    [[], USAGE],
    [["bogus"], USAGE],
    [["list", "--lang"], "--lang requires a value"],
    [["list", "--lang", "--json"], "--lang requires a value"],
    [["list", "--wat"], "unknown option --wat"],
    [["run"], "run takes exactly one of <id> or --all"],
    [["run", "a", "b"], "run takes exactly one of <id> or --all"],
    [["run", "a", "--all"], "run takes exactly one of <id> or --all"],
    [["check", "extra"], "check takes no positional arguments"],
  ])("rejects %j", (argv, message) => {
    expect(() => parseArgs(argv)).toThrow(message);
  });
});

describe("main", () => {
  let repo: Repo;
  afterEach(() => {
    repo.dispose();
  });

  const opts = (r: Repo) => ({ cwd: r.root, io: r.ctx.io, loadCatalog: (root: string) => loadCatalog(root, { allowFixtureIds: true }) });

  it("dispatches every command", () => {
    repo = makeRepo();
    expect(main(["list", "--lang", "java"], opts(repo))).toBe(0);
    expect(repo.out()).toBe("Java: fixture-alpha, fixture-beta\n");
    expect(main(["run", "fixture-alpha", "--lang", "java"], opts(repo))).toBe(0);
    expect(repo.out()).toContain("== Java ==\n" + ALPHA);
    expect(main(["snapshot", "--pattern", "fixture-alpha"], opts(repo))).toBe(0);
    expect(main(["snapshot", "--update"], opts(repo))).toBe(0);
    expect(main(["check", "--json"], opts(repo))).toBe(0);
    expect(main(["validate", "--write-readme"], opts(repo))).toBe(0);
    expect(main(["validate"], opts(repo))).toBe(0);
    expect(main(["run", "--all", "--lang", "python"], opts(repo))).toBe(0);
  });

  it("turns usage and catalog errors into exit 1 with a message", () => {
    repo = makeRepo();
    expect(main([], opts(repo))).toBe(1);
    expect(repo.err()).toContain("usage: patterns <command>");
    expect(main(["run", "nope"], opts(repo))).toBe(1);
    expect(repo.err()).toContain("not in catalog: nope\n");
    expect(main(["list"], { cwd: repo.root, io: repo.ctx.io })).toBe(1);
    expect(repo.err()).toContain("reserved fixture- prefix");
  });

  it("finds the root from a nested directory", () => {
    repo = makeRepo();
    snapshot(repo.ctx, {});
    expect(main(["check"], { ...opts(repo), cwd: repo.root + "/java/alpha" })).toBe(0);
  });
});
