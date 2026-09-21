import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { RealSubject } from "./real-subject.js";
import { VirtualProxy } from "./virtual-proxy.js";

function countingProxy() {
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
    assert.equal(proxy.isLoaded(), false);
    assert.equal(creations(), 0);
  });

  it("the real subject is created once and reused for every request", () => {
    const { proxy, creations } = countingProxy();
    assert.equal(proxy.request(), "RealSubject.request()");
    assert.equal(proxy.isLoaded(), true);
    proxy.request();
    proxy.request();
    assert.equal(creations(), 1);
  });
});
