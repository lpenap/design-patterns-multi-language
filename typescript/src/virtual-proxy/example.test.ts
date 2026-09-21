import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { virtualProxyExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    virtualProxyExample.run(out);
    expect(virtualProxyExample.id).toBe("virtual-proxy");
    expect(out.lines).toEqual([
      "Executing Virtual Proxy Pattern Implementation",
      "  Proxy created, real subject loaded: false",
      "  RealSubject.request()",
      "  RealSubject.request()",
      "  Real subject loaded: true, created 1 time",
    ]);
  });
});
