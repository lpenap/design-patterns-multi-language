import type { Example } from "../runtime/contract.ts";
import { Abstraction, ConcreteImplementorA, ConcreteImplementorB, type Implementor, RefinedAbstraction } from "./bridge.ts";

/** The client: combines each abstraction with each implementor. */
export const bridgeExample: Example = {
  id: "bridge",
  run(out) {
    out.line("Executing Bridge Pattern Implementation");
    const implementors: Implementor[] = [new ConcreteImplementorA(), new ConcreteImplementorB()];
    for (const implementor of implementors) {
      out.line(`  ${new Abstraction(implementor).operation()}`);
    }
    for (const implementor of implementors) {
      out.line(`  ${new RefinedAbstraction(implementor).operation()}`);
    }
  },
};
