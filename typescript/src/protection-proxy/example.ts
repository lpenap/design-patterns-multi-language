import type { Example } from "../runtime/contract.ts";
import { ProtectionProxy, RealSubject, type Subject } from "./protection-proxy.ts";

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
