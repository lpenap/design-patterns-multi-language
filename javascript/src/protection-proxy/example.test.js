import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { protectionProxyExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    protectionProxyExample.run(out);
    assert.equal(protectionProxyExample.id, "protection-proxy");
    assert.deepEqual(out.lines, ["Executing Protection Proxy Pattern Implementation", "  admin: RealSubject.request()", "  guest: access denied by ProtectionProxy"]);
  });
});
