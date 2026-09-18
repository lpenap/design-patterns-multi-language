import type { Example } from "../runtime/contract.ts";
import { ConcreteCreatorA, ConcreteCreatorB, type Creator } from "./factory-method.ts";

/** The client: uses creators through the Creator type only. */
export const factoryMethodExample: Example = {
  id: "factory-method",
  run(out) {
    out.line("Executing Factory Method Pattern Implementation");
    const creators: Creator[] = [new ConcreteCreatorA(), new ConcreteCreatorB()];
    for (const creator of creators) {
      out.line(`  ${creator.anOperation()}`);
    }
  },
};
