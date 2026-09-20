import { ProtectionProxy, RealSubject } from "./protection-proxy.js";

/** The client: makes the same call through proxies carrying different roles. */
export const protectionProxyExample = {
  id: "protection-proxy",
  run(out) {
    out.line("Executing Protection Proxy Pattern Implementation");
    const real = new RealSubject();
    for (const role of ["admin", "guest"]) {
      out.line(`  ${role}: ${new ProtectionProxy(real, role).request()}`);
    }
  },
};
