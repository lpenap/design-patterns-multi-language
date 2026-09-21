import { describe, expect, it } from "vitest";
import { RealSubject } from "./real-subject.ts";
import { VirtualProxy } from "./virtual-proxy.ts";

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
});
