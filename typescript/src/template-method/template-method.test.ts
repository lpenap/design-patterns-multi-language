import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { templateMethodExample } from "./example.ts";
import { AbstractClass, ConcreteClassA, ConcreteClassB } from "./template-method.ts";

describe("TemplateMethod", () => {
  it("skeleton comes from the base and steps from the subclass", () => {
    expect(new ConcreteClassA().templateMethod()).toBe("ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2");
  });

  it("an overridden hook extends the result", () => {
    expect(new ConcreteClassB().templateMethod()).toBe("ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook");
  });

  it("the hook defaults to nothing", () => {
    class Minimal extends AbstractClass {
      protected primitiveOperation1(): string {
        return "one";
      }
      protected primitiveOperation2(): string {
        return "two";
      }
    }
    expect(new Minimal().templateMethod()).toBe("one then two");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    templateMethodExample.run(out);
    expect(templateMethodExample.id).toBe("template-method");
    expect(out.lines).toEqual([
      "Executing Template Method Pattern Implementation",
      "  ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2",
      "  ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook",
    ]);
  });
});
