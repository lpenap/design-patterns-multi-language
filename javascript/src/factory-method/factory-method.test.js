import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteCreatorA } from "./concrete-creator-a.js";
import { ConcreteCreatorB } from "./concrete-creator-b.js";
import { Creator } from "./creator.js";

describe("FactoryMethod", () => {
  it("each concrete creator builds its own product", () => {
    assert.equal(new ConcreteCreatorA().anOperation(), "Built ConcreteProductA");
    assert.equal(new ConcreteCreatorB().anOperation(), "Built ConcreteProductB");
  });

  it("template operation uses whatever the subclass returns", () => {
    class CustomCreator extends Creator {
      factoryMethod() {
        return { name: () => "Custom" };
      }
    }
    assert.equal(new CustomCreator().anOperation(), "Built Custom");
  });

  it("a creator without factoryMethod() fails at the first call", () => {
    assert.throws(() => new Creator().anOperation(), /must implement factoryMethod/);
  });
});
