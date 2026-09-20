import { describe, expect, it } from "vitest";
import { ConcreteProductA } from "./concrete-product-a.ts";
import { ConcreteProductB } from "./concrete-product-b.ts";
import { SimpleFactory } from "./simple-factory.ts";

describe("SimpleFactory", () => {
  const factory = new SimpleFactory();

  it("maps type codes to concrete products", () => {
    expect(factory.createProduct("A")).toBeInstanceOf(ConcreteProductA);
    expect(factory.createProduct("B")).toBeInstanceOf(ConcreteProductB);
    expect(factory.createProduct("A").name()).toBe("ConcreteProductA");
    expect(factory.createProduct("B").name()).toBe("ConcreteProductB");
  });

  it("rejects unknown types", () => {
    expect(() => factory.createProduct("Z")).toThrow("Unknown product type: Z");
  });
});
