import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { templateMethodExample } from "./example.js";
import { AbstractClass, ConcreteClassA, ConcreteClassB } from "./template-method.js";

describe("TemplateMethod", () => {
  it("skeleton comes from the base and steps from the subclass", () => {
    assert.equal(new ConcreteClassA().templateMethod(), "ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2");
  });

  it("an overridden hook extends the result", () => {
    assert.equal(new ConcreteClassB().templateMethod(), "ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook");
  });

  it("the hook defaults to nothing", () => {
    class Minimal extends AbstractClass {
      primitiveOperation1() {
        return "one";
      }
      primitiveOperation2() {
        return "two";
      }
    }
    assert.equal(new Minimal().templateMethod(), "one then two");
  });

  it("a subclass missing a primitive operation fails at the first call", () => {
    class OnlyOne extends AbstractClass {
      primitiveOperation1() {
        return "one";
      }
    }
    assert.throws(() => new OnlyOne().templateMethod(), /must implement primitiveOperation2/);
    assert.throws(() => new AbstractClass().templateMethod(), /must implement primitiveOperation1/);
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    templateMethodExample.run(out);
    assert.equal(templateMethodExample.id, "template-method");
    assert.deepEqual(out.lines, [
      "Executing Template Method Pattern Implementation",
      "  ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2",
      "  ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook",
    ]);
  });
});
