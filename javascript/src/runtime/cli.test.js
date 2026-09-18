import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { run, SEPARATOR, USAGE } from "./cli.js";
import { indexExamples } from "./contract.js";
import { ALPHA, BETA, fixtureAlpha, fixtureBeta, fixtureFailing } from "./fixtures.test-helper.js";

const SEP = SEPARATOR + "\n";
const all = [fixtureAlpha, fixtureBeta, fixtureFailing];

function call(argv, list) {
  let out = "";
  let err = "";
  const io = {
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

describe("list (US1)", () => {
  it("prints sorted compact JSON", () => {
    assert.deepEqual(call(["list"], all), {
      code: 0,
      out: '["fixture-alpha","fixture-beta","fixture-failing"]\n',
      err: "",
    });
  });

  it("prints an empty array when there are no examples", () => {
    assert.deepEqual(call(["list"], []), { code: 0, out: "[]\n", err: "" });
  });
});

describe("run <id> (US2)", () => {
  it("prints exact lines", () => {
    assert.deepEqual(call(["run", "fixture-alpha"], all), { code: 0, out: ALPHA, err: "" });
  });

  it("exits 2 on an unknown id", () => {
    assert.deepEqual(call(["run", "nope"], all), { code: 2, out: "", err: "unknown example: nope\n" });
  });

  it("leaves stdout clean and exits 1 when the example throws", () => {
    assert.deepEqual(call(["run", "fixture-failing"], all), {
      code: 1,
      out: "",
      err: "example failed: fixture-failing: boom\n",
    });
  });

  it("reports non-Error throwables", () => {
    const odd = {
      id: "odd",
      run() {
        throw "plain string";
      },
    };
    assert.equal(call(["run", "odd"], [odd]).err, "example failed: odd: plain string\n");
  });
});

describe("run --all (US3)", () => {
  it("separates outputs and reports failures", () => {
    assert.deepEqual(call(["run", "--all"], all), {
      code: 1,
      out: ALPHA + SEP + BETA + SEP,
      err: "example failed: fixture-failing: boom\n",
    });
  });

  it("succeeds with one separator between two examples", () => {
    assert.deepEqual(call(["run", "--all"], [fixtureAlpha, fixtureBeta]), {
      code: 0,
      out: ALPHA + SEP + BETA,
      err: "",
    });
  });

  it("prints nothing with no examples", () => {
    assert.deepEqual(call(["run", "--all"], []), { code: 0, out: "", err: "" });
  });

  it("does not print a leading separator when the first example fails", () => {
    const failingFirst = {
      id: "a-failing",
      run() {
        throw new Error("x");
      },
    };
    assert.deepEqual(call(["run", "--all"], [failingFirst, fixtureBeta]), {
      code: 1,
      out: BETA,
      err: "example failed: a-failing: x\n",
    });
  });
});

describe("usage", () => {
  for (const argv of [[], ["bogus"], ["run"], ["list", "extra"]]) {
    it(`rejects ${JSON.stringify(argv)}`, () => {
      assert.deepEqual(call(argv, all), { code: 1, out: "", err: USAGE + "\n" });
    });
  }
});
