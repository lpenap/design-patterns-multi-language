import type { Example } from "../runtime/contract.ts";
import { Facade } from "./facade.ts";

/** The client: talks to the facade only. */
export const facadeExample: Example = {
  id: "facade",
  run(out) {
    out.line("Executing Facade Pattern Implementation");
    out.line(`  ${new Facade().operation()}`);
  },
};
