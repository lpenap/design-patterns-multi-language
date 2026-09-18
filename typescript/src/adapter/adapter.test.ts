import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { Adaptee, Adapter, type Target } from "./adapter.ts";
import { adapterExample } from "./example.ts";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    adapterExample.run(out);
    expect(adapterExample.id).toBe("adapter");
    expect(out.lines).toEqual(["Executing Adapter Pattern Implementation", "  Adapter(Adaptee)"]);
  });
});
