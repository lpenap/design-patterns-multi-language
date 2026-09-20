import { Abstraction } from "./abstraction.js";
import { ConcreteImplementorA } from "./concrete-implementor-a.js";
import { ConcreteImplementorB } from "./concrete-implementor-b.js";
import { RefinedAbstraction } from "./refined-abstraction.js";

/** The client: combines each abstraction with each implementor. */
export const bridgeExample = {
  id: "bridge",
  run(out) {
    out.line("Executing Bridge Pattern Implementation");
    const implementors = [new ConcreteImplementorA(), new ConcreteImplementorB()];
    for (const implementor of implementors) {
      out.line(`  ${new Abstraction(implementor).operation()}`);
    }
    for (const implementor of implementors) {
      out.line(`  ${new RefinedAbstraction(implementor).operation()}`);
    }
  },
};
