import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { Adaptee, Adapter } from "./adapter.js";
import { adapterExample } from "./example.js";

describe("Adapter", () => {
  it("translates request() into specificRequest()", () => {
    assert.equal(new Adapter(new Adaptee()).request(), "Adapter(Adaptee)");
  });

  it("delegates to whichever adaptee it holds", () => {
    assert.equal(new Adapter({ specificRequest: () => "Other" }).request(), "Adapter(Other)");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    adapterExample.run(out);
    assert.equal(adapterExample.id, "adapter");
    assert.deepEqual(out.lines, ["Executing Adapter Pattern Implementation", "  Adapter(Adaptee)"]);
  });
});
