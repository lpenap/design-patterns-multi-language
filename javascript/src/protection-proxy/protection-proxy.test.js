import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ProtectionProxy } from "./protection-proxy.js";
import { RealSubject } from "./real-subject.js";

describe("ProtectionProxy", () => {
  it("an admin is forwarded to the real subject", () => {
    assert.equal(new ProtectionProxy(new RealSubject(), "admin").request(), "RealSubject.request()");
  });

  it("a guest is denied and the real subject is never invoked", () => {
    let calls = 0;
    const counting = {
      request: () => {
        calls++;
        return "secret";
      },
    };
    assert.equal(new ProtectionProxy(counting, "guest").request(), "access denied by ProtectionProxy");
    assert.equal(calls, 0);
    assert.equal(new ProtectionProxy(counting, "admin").request(), "secret");
    assert.equal(calls, 1);
  });
});
