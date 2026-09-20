import type { Example } from "../runtime/contract.ts";
import { ConcreteStateA, Context } from "./state.ts";

/** The client: issues requests to the context and never touches the states. */
export const stateExample: Example = {
  id: "state",
  run(out) {
    out.line("Executing State Pattern Implementation");
    const context = new Context(new ConcreteStateA());
    out.line(`  Context in ${context.getStateName()}`);
    out.line(`  ${context.request()}`);
    out.line(`  ${context.request()}`);
  },
};
