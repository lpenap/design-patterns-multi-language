import { ConcreteCreatorA, ConcreteCreatorB } from "./factory-method.js";

/** The client: uses creators through their common base only. */
export const factoryMethodExample = {
  id: "factory-method",
  run(out) {
    out.line("Executing Factory Method Pattern Implementation");
    for (const creator of [new ConcreteCreatorA(), new ConcreteCreatorB()]) {
      out.line(`  ${creator.anOperation()}`);
    }
  },
};
