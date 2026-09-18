import type { Example } from "../runtime/contract.ts";
import { type AbstractClass, ConcreteClassA, ConcreteClassB } from "./template-method.ts";

/** The client: calls the template method through the abstract type. */
export const templateMethodExample: Example = {
  id: "template-method",
  run(out) {
    out.line("Executing Template Method Pattern Implementation");
    const instances: AbstractClass[] = [new ConcreteClassA(), new ConcreteClassB()];
    for (const instance of instances) {
      out.line(`  ${instance.templateMethod()}`);
    }
  },
};
