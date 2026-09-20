import { Abstraction, ConcreteImplementorA, ConcreteImplementorB, RefinedAbstraction } from "./bridge.js";

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
