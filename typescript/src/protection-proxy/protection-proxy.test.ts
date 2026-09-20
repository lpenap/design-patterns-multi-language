import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { protectionProxyExample } from "./example.ts";
import { ProtectionProxy, RealSubject } from "./protection-proxy.ts";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    protectionProxyExample.run(out);
    expect(protectionProxyExample.id).toBe("protection-proxy");
    expect(out.lines).toEqual(["Executing Protection Proxy Pattern Implementation", "  admin: RealSubject.request()", "  guest: access denied by ProtectionProxy"]);
  });
});
