import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { singletonExample } from "./example.ts";
import { Singleton } from "./singleton.ts";

describe("Singleton", () => {
  it("instance() returns the same object every time", () => {
    expect(Singleton.instance()).toBe(Singleton.instance());
  });

  it("the instance does its work", () => {
    expect(Singleton.instance().doSomething()).toBe("Singleton is doing something");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    singletonExample.run(out);
    expect(singletonExample.id).toBe("singleton");
    expect(out.lines).toEqual(["Executing Singleton Pattern Implementation", "  Same instance returned twice: true", "  Singleton is doing something"]);
  });
});
