import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { protectionProxyExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    protectionProxyExample.run(out);
    expect(protectionProxyExample.id).toBe("protection-proxy");
    expect(out.lines).toEqual(["Executing Protection Proxy Pattern Implementation", "  admin: RealSubject.request()", "  guest: access denied by ProtectionProxy"]);
  });
});
