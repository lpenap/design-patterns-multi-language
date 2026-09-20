import type { Example } from "../runtime/contract.ts";
import { RealSubject, type Subject, VirtualProxy } from "./virtual-proxy.ts";

/** The client: observes that the real subject is created once, at the first request. */
export const virtualProxyExample: Example = {
  id: "virtual-proxy",
  run(out) {
    out.line("Executing Virtual Proxy Pattern Implementation");
    let creations = 0;
    const proxy = new VirtualProxy(() => {
      creations++;
      return new RealSubject();
    });
    out.line(`  Proxy created, real subject loaded: ${String(proxy.isLoaded())}`);
    const subject: Subject = proxy;
    out.line(`  ${subject.request()}`);
    out.line(`  ${subject.request()}`);
    out.line(`  Real subject loaded: ${String(proxy.isLoaded())}, created ${String(creations)} time`);
  },
};
