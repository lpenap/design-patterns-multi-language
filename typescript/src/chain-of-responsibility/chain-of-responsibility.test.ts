import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { type Handler, NegativeHandler, PositiveHandler, ZeroHandler } from "./chain-of-responsibility.ts";
import { chainOfResponsibilityExample } from "./example.ts";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    chainOfResponsibilityExample.run(out);
    expect(chainOfResponsibilityExample.id).toBe("chain-of-responsibility");
    expect(out.lines).toEqual(["Executing Chain of Responsibility Pattern Implementation", "  -1 is negative", "  0 is zero", "  1 is positive"]);
  });
});
