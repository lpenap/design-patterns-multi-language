import { ConcreteStateA } from "./concrete-state-a.js";
import { Context } from "./context.js";

/** The client: issues requests to the context and never touches the states. */
export const stateExample = {
  id: "state",
  run(out) {
    out.line("Executing State Pattern Implementation");
    const context = new Context(new ConcreteStateA());
    out.line(`  Context in ${context.getStateName()}`);
    out.line(`  ${context.request()}`);
    out.line(`  ${context.request()}`);
  },
};
