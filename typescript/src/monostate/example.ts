import type { Example } from "../runtime/contract.ts";
import { Monostate } from "./monostate.ts";

/** The client: two ordinary instances that turn out to share their state. */
export const monostateExample: Example = {
  id: "monostate",
  run(out) {
    out.line("Executing Monostate Pattern Implementation");
    const a = new Monostate();
    const b = new Monostate();
    out.line(`  Two instances are distinct objects: ${String(a !== b)}`);
    a.setValue(42);
    out.line(`  a.setValue(42) then b.getValue(): ${String(b.getValue())}`);
    b.setValue(7);
    out.line(`  b.setValue(7) then a.getValue(): ${String(a.getValue())}`);
  },
};
