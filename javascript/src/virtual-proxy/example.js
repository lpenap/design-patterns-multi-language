import { RealSubject, VirtualProxy } from "./virtual-proxy.js";

/** The client: observes that the real subject is created once, at the first request. */
export const virtualProxyExample = {
  id: "virtual-proxy",
  run(out) {
    out.line("Executing Virtual Proxy Pattern Implementation");
    let creations = 0;
    const proxy = new VirtualProxy(() => {
      creations++;
      return new RealSubject();
    });
    out.line(`  Proxy created, real subject loaded: ${proxy.isLoaded()}`);
    out.line(`  ${proxy.request()}`);
    out.line(`  ${proxy.request()}`);
    out.line(`  Real subject loaded: ${proxy.isLoaded()}, created ${creations} time`);
  },
};
