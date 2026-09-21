import { describe, expect, it } from "vitest";
import { ProtectionProxy } from "./protection-proxy.ts";
import { RealSubject } from "./real-subject.ts";

describe("ProtectionProxy", () => {
  it("an admin is forwarded to the real subject", () => {
    expect(new ProtectionProxy(new RealSubject(), "admin").request()).toBe("RealSubject.request()");
  });

  it("a guest is denied and the real subject is never invoked", () => {
    let calls = 0;
    const counting = {
      request: () => {
        calls++;
        return "secret";
      },
    };
    expect(new ProtectionProxy(counting, "guest").request()).toBe("access denied by ProtectionProxy");
    expect(calls).toBe(0);
    expect(new ProtectionProxy(counting, "admin").request()).toBe("secret");
    expect(calls).toBe(1);
  });
});
