import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { virtualProxyExample } from "./example.ts";
import { RealSubject, VirtualProxy } from "./virtual-proxy.ts";

function countingProxy(): { proxy: VirtualProxy; creations: () => number } {
  let n = 0;
  const proxy = new VirtualProxy(() => {
    n++;
    return new RealSubject();
  });
  return { proxy, creations: () => n };
}

describe("VirtualProxy", () => {
  it("constructing the proxy does not create the real subject", () => {
    const { proxy, creations } = countingProxy();
    expect(proxy.isLoaded()).toBe(false);
    expect(creations()).toBe(0);
  });

  it("the real subject is created once and reused for every request", () => {
    const { proxy, creations } = countingProxy();
    expect(proxy.request()).toBe("RealSubject.request()");
    expect(proxy.isLoaded()).toBe(true);
    proxy.request();
    proxy.request();
    expect(creations()).toBe(1);
  });

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
