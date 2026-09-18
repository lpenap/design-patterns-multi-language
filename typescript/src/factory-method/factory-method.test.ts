import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { factoryMethodExample } from "./example.ts";
import { ConcreteCreatorA, ConcreteCreatorB, Creator, type Product } from "./factory-method.ts";

describe("FactoryMethod", () => {
  it("each concrete creator builds its own product", () => {
    expect(new ConcreteCreatorA().anOperation()).toBe("Built ConcreteProductA");
    expect(new ConcreteCreatorB().anOperation()).toBe("Built ConcreteProductB");
  });

  it("template operation uses whatever the subclass returns", () => {
    class CustomCreator extends Creator {
      protected factoryMethod(): Product {
        return { name: () => "Custom" };
      }
    }
    expect(new CustomCreator().anOperation()).toBe("Built Custom");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    factoryMethodExample.run(out);
    expect(factoryMethodExample.id).toBe("factory-method");
    expect(out.lines).toEqual(["Executing Factory Method Pattern Implementation", "  Built ConcreteProductA", "  Built ConcreteProductB"]);
  });
});
