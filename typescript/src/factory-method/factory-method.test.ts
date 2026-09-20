import { describe, expect, it } from "vitest";
import { ConcreteCreatorA } from "./concrete-creator-a.ts";
import { ConcreteCreatorB } from "./concrete-creator-b.ts";
import { Creator } from "./creator.ts";
import type { Product } from "./product.ts";

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
});
