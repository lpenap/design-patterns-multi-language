import type { Example } from "../runtime/contract.ts";
import { Adaptee, Adapter, type Target } from "./adapter.ts";

/** The client: collaborates through Target only. */
export const adapterExample: Example = {
  id: "adapter",
  run(out) {
    out.line("Executing Adapter Pattern Implementation");
    const target: Target = new Adapter(new Adaptee());
    out.line(`  ${target.request()}`);
  },
};
