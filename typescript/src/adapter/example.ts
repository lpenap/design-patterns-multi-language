import type { Example } from "../runtime/contract.ts";
import { Adaptee } from "./adaptee.ts";
import { Adapter } from "./adapter.ts";
import type { Target } from "./target.ts";

/** The client: collaborates through Target only. */
export const adapterExample: Example = {
  id: "adapter",
  run(out) {
    out.line("Executing Adapter Pattern Implementation");
    const target: Target = new Adapter(new Adaptee());
    out.line(`  ${target.request()}`);
  },
};
