import { describe, expect, it } from "vitest";
import { run, SEPARATOR, USAGE } from "./cli.ts";
import { type Example, indexExamples, type Io } from "./contract.ts";
import { ALPHA, BETA, fixtureAlpha, fixtureBeta, fixtureFailing } from "./fixtures.test-helper.ts";

const SEP = SEPARATOR + "\n";

function call(argv: string[], list: Example[]): { code: number; out: string; err: string } {
  let out = "";
  let err = "";
  const io: Io = {
    write: (t) => {
      out += t;
    },
    error: (t) => {
      err += t;
    },
  };
  const code = run(argv, io, indexExamples(list));
  return { code, out, err };
}

const all = [fixtureAlpha, fixtureBeta, fixtureFailing];

describe("list (US1)", () => {
  it("prints sorted compact JSON", () => {
    expect(call(["list"], all)).toEqual({
      code: 0,
      out: '["fixture-alpha","fixture-beta","fixture-failing"]\n',
      err: "",
    });
  });

  it("prints an empty array when there are no examples", () => {
    expect(call(["list"], [])).toEqual({ code: 0, out: "[]\n", err: "" });
  });
});

describe("run <id> (US2)", () => {
  it("prints exact lines", () => {
    expect(call(["run", "fixture-alpha"], all)).toEqual({ code: 0, out: ALPHA, err: "" });
  });

  it("exits 2 on an unknown id", () => {
    expect(call(["run", "nope"], all)).toEqual({ code: 2, out: "", err: "unknown example: nope\n" });
  });

  it("leaves stdout clean and exits 1 when the example throws", () => {
    expect(call(["run", "fixture-failing"], all)).toEqual({
      code: 1,
      out: "",
      err: "example failed: fixture-failing: boom\n",
    });
  });

  it("reports non-Error throwables", () => {
    const odd: Example = {
      id: "odd",
      run() {
        throw "plain string";
      },
    };
    expect(call(["run", "odd"], [odd]).err).toBe("example failed: odd: plain string\n");
  });
});

describe("run --all (US3)", () => {
  it("separates outputs and reports failures", () => {
    expect(call(["run", "--all"], all)).toEqual({
      code: 1,
      out: ALPHA + SEP + BETA + SEP,
      err: "example failed: fixture-failing: boom\n",
    });
  });

  it("succeeds with one separator between two examples", () => {
    expect(call(["run", "--all"], [fixtureAlpha, fixtureBeta])).toEqual({
      code: 0,
      out: ALPHA + SEP + BETA,
      err: "",
    });
  });

  it("prints nothing with no examples", () => {
    expect(call(["run", "--all"], [])).toEqual({ code: 0, out: "", err: "" });
  });

  it("does not print a leading separator when the first example fails", () => {
    const failingFirst: Example = {
      id: "a-failing",
      run() {
        throw new Error("x");
      },
    };
    expect(call(["run", "--all"], [failingFirst, fixtureBeta])).toEqual({
      code: 1,
      out: BETA,
      err: "example failed: a-failing: x\n",
    });
  });
});

describe("usage", () => {
  it.each([[[]], [["bogus"]], [["run"]], [["list", "extra"]]])("rejects %j", (argv) => {
    expect(call(argv, all)).toEqual({ code: 1, out: "", err: USAGE + "\n" });
  });
});
