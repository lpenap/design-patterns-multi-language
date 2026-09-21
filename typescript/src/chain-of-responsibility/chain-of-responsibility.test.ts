import { describe, expect, it } from "vitest";
import type { Handler } from "./handler.ts";
import { NegativeHandler } from "./negative-handler.ts";
import { PositiveHandler } from "./positive-handler.ts";
import { ZeroHandler } from "./zero-handler.ts";

function fullChain(): Handler {
  const head = new NegativeHandler();
  head.setNext(new ZeroHandler()).setNext(new PositiveHandler());
  return head;
}

describe("ChainOfResponsibility", () => {
  it("each request is answered by the responsible handler", () => {
    const chain = fullChain();
    expect(chain.handle(-5)).toBe("negative");
    expect(chain.handle(0)).toBe("zero");
    expect(chain.handle(7)).toBe("positive");
  });

  it("a request nobody claims falls off the end", () => {
    const shortened = new NegativeHandler();
    shortened.setNext(new ZeroHandler());
    expect(shortened.handle(1)).toBe("unhandled");
    expect(new PositiveHandler().handle(-1)).toBe("unhandled");
  });

  it("relinking changes who answers", () => {
    const head = new PositiveHandler();
    expect(head.handle(-1)).toBe("unhandled");
    head.setNext(new NegativeHandler());
    expect(head.handle(-1)).toBe("negative");
  });
});
