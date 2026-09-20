import { describe, expect, it } from "vitest";
import { Adaptee } from "./adaptee.ts";
import { Adapter } from "./adapter.ts";
import type { Target } from "./target.ts";

describe("Adapter", () => {
  it("translates request() into specificRequest()", () => {
    const target: Target = new Adapter(new Adaptee());
    expect(target.request()).toBe("Adapter(Adaptee)");
  });

  it("delegates to whichever adaptee it holds", () => {
    class Other extends Adaptee {
      override specificRequest(): string {
        return "Other";
      }
    }
    expect(new Adapter(new Other()).request()).toBe("Adapter(Other)");
  });
});
