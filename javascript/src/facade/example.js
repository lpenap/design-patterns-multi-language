import { Facade } from "./facade.js";

/** The client: talks to the facade only. */
export const facadeExample = {
  id: "facade",
  run(out) {
    out.line("Executing Facade Pattern Implementation");
    out.line(`  ${new Facade().operation()}`);
  },
};
