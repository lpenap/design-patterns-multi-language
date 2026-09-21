import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { virtualProxyExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    virtualProxyExample.run(out);
    assert.equal(virtualProxyExample.id, "virtual-proxy");
    assert.deepEqual(out.lines, [
      "Executing Virtual Proxy Pattern Implementation",
      "  Proxy created, real subject loaded: false",
      "  RealSubject.request()",
      "  RealSubject.request()",
      "  Real subject loaded: true, created 1 time",
    ]);
  });
});
