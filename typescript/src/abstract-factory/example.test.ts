import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { abstractFactoryExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    abstractFactoryExample.run(out);
    expect(abstractFactoryExample.id).toBe("abstract-factory");
    expect(out.lines).toEqual(["Executing Abstract Factory Pattern Implementation", "  ProductA1", "  ProductB1", "  ProductA2", "  ProductB2"]);
  });
});
