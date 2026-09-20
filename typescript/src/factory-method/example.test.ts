import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { factoryMethodExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    factoryMethodExample.run(out);
    expect(factoryMethodExample.id).toBe("factory-method");
    expect(out.lines).toEqual(["Executing Factory Method Pattern Implementation", "  Built ConcreteProductA", "  Built ConcreteProductB"]);
  });
});
