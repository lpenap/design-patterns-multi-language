import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Singleton } from "./singleton.js";

describe("Singleton", () => {
  it("instance() returns the same object every time", () => {
    assert.equal(Singleton.instance(), Singleton.instance());
  });

  it("the instance does its work", () => {
    assert.equal(Singleton.instance().doSomething(), "Singleton is doing something");
  });
});
