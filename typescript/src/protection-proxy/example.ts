import type { Example } from "../runtime/contract.ts";
import { ProtectionProxy } from "./protection-proxy.ts";
import { RealSubject } from "./real-subject.ts";
import type { Subject } from "./subject.ts";

/** The client: makes the same call through proxies carrying different roles. */
export const protectionProxyExample: Example = {
  id: "protection-proxy",
  run(out) {
    out.line("Executing Protection Proxy Pattern Implementation");
    const real = new RealSubject();
    for (const role of ["admin", "guest"]) {
      const subject: Subject = new ProtectionProxy(real, role);
      out.line(`  ${role}: ${subject.request()}`);
    }
  },
};
