import type { Example } from "../runtime/contract.ts";
import { ConcreteCreatorA } from "./concrete-creator-a.ts";
import { ConcreteCreatorB } from "./concrete-creator-b.ts";
import type { Creator } from "./creator.ts";

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
