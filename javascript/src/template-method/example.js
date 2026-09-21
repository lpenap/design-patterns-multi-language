import { ConcreteClassA } from "./concrete-class-a.js";
import { ConcreteClassB } from "./concrete-class-b.js";

/** The client: calls the template method through the common base. */
export const templateMethodExample = {
  id: "template-method",
  run(out) {
    out.line("Executing Template Method Pattern Implementation");
    for (const instance of [new ConcreteClassA(), new ConcreteClassB()]) {
      out.line(`  ${instance.templateMethod()}`);
    }
  },
};
