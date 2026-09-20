import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { singletonExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    singletonExample.run(out);
    expect(singletonExample.id).toBe("singleton");
    expect(out.lines).toEqual(["Executing Singleton Pattern Implementation", "  Same instance returned twice: true", "  Singleton is doing something"]);
  });
});
