import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { NegativeHandler } from "./negative-handler.js";
import { PositiveHandler } from "./positive-handler.js";
import { ZeroHandler } from "./zero-handler.js";

function fullChain() {
  const head = new NegativeHandler();
  head.setNext(new ZeroHandler()).setNext(new PositiveHandler());
  return head;
}

describe("ChainOfResponsibility", () => {
  it("each request is answered by the responsible handler", () => {
    const chain = fullChain();
    assert.equal(chain.handle(-5), "negative");
    assert.equal(chain.handle(0), "zero");
    assert.equal(chain.handle(7), "positive");
  });

  it("a request nobody claims falls off the end", () => {
    const shortened = new NegativeHandler();
    shortened.setNext(new ZeroHandler());
    assert.equal(shortened.handle(1), "unhandled");
    assert.equal(new PositiveHandler().handle(-1), "unhandled");
  });

  it("relinking changes who answers", () => {
    const head = new PositiveHandler();
    assert.equal(head.handle(-1), "unhandled");
    head.setNext(new NegativeHandler());
    assert.equal(head.handle(-1), "negative");
  });
});
