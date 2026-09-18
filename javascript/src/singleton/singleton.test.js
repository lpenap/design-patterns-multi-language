import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { singletonExample } from "./example.js";
import { Singleton } from "./singleton.js";

describe("Singleton", () => {
  it("instance() returns the same object every time", () => {
    assert.equal(Singleton.instance(), Singleton.instance());
  });

  it("the instance does its work", () => {
    assert.equal(Singleton.instance().doSomething(), "Singleton is doing something");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    singletonExample.run(out);
    assert.equal(singletonExample.id, "singleton");
    assert.deepEqual(out.lines, ["Executing Singleton Pattern Implementation", "  Same instance returned twice: true", "  Singleton is doing something"]);
  });
});
