import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Adaptee } from "./adaptee.js";
import { Adapter } from "./adapter.js";

describe("Adapter", () => {
  it("translates request() into specificRequest()", () => {
    assert.equal(new Adapter(new Adaptee()).request(), "Adapter(Adaptee)");
  });

  it("delegates to whichever adaptee it holds", () => {
    assert.equal(new Adapter({ specificRequest: () => "Other" }).request(), "Adapter(Other)");
  });
});
