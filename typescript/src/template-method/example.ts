import type { Example } from "../runtime/contract.ts";
import type { AbstractClass } from "./abstract-class.ts";
import { ConcreteClassA } from "./concrete-class-a.ts";
import { ConcreteClassB } from "./concrete-class-b.ts";

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
