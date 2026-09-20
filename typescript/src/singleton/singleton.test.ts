import { describe, expect, it } from "vitest";
import { Singleton } from "./singleton.ts";

describe("Singleton", () => {
  it("instance() returns the same object every time", () => {
    expect(Singleton.instance()).toBe(Singleton.instance());
  });

  it("the instance does its work", () => {
    expect(Singleton.instance().doSomething()).toBe("Singleton is doing something");
  });
});
