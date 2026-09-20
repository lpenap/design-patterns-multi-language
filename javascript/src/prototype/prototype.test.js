import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcretePrototype1 } from "./concrete-prototype1.js";
import { ConcretePrototype2 } from "./concrete-prototype2.js";

describe("Prototype", () => {
  it("a clone is a distinct object with equal state", () => {
    const original = new ConcretePrototype1("x");
    const clone = original.clone();
    assert.notEqual(clone, original);
    assert.equal(clone.describe(), original.describe());
  });

  it("changing the clone leaves the original untouched", () => {
    const original = new ConcretePrototype2("x");
    const clone = original.clone();
    clone.setState("y");
    assert.equal(original.describe(), "ConcretePrototype2(state=x)");
    assert.equal(clone.describe(), "ConcretePrototype2(state=y)");
  });

  it("cloning preserves the concrete class", () => {
    assert.ok(new ConcretePrototype1("a").clone() instanceof ConcretePrototype1);
    assert.ok(new ConcretePrototype2("b").clone() instanceof ConcretePrototype2);
  });
});
