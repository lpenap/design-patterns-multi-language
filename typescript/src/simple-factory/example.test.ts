import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { simpleFactoryExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    simpleFactoryExample.run(out);
    expect(simpleFactoryExample.id).toBe("simple-factory");
    expect(out.lines).toEqual(["Executing Simple Factory Pattern Implementation", "  ConcreteProductA", "  ConcreteProductB"]);
  });
});
