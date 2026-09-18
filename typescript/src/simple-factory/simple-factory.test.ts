import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { simpleFactoryExample } from "./example.ts";
import { ConcreteProductA, ConcreteProductB, SimpleFactory } from "./simple-factory.ts";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    simpleFactoryExample.run(out);
    expect(simpleFactoryExample.id).toBe("simple-factory");
    expect(out.lines).toEqual(["Executing Simple Factory Pattern Implementation", "  ConcreteProductA", "  ConcreteProductB"]);
  });
});
