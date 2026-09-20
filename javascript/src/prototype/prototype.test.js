import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { prototypeExample } from "./example.js";
import { ConcretePrototype1, ConcretePrototype2 } from "./prototype.js";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    prototypeExample.run(out);
    assert.equal(prototypeExample.id, "prototype");
    assert.deepEqual(out.lines, [
      "Executing Prototype Pattern Implementation",
      "  Original: ConcretePrototype1(state=alpha)",
      "  Clone: ConcretePrototype1(state=alpha)",
      "  Clone is a distinct object: true",
      "  Clone after setState(beta): ConcretePrototype1(state=beta)",
      "  Original after the clone changed: ConcretePrototype1(state=alpha)",
      "  ConcretePrototype2 clone: ConcretePrototype2(state=gamma)",
    ]);
  });
});
