import type { Example } from "../runtime/contract.ts";
import { ConcretePrototype1 } from "./concrete-prototype1.ts";
import { ConcretePrototype2 } from "./concrete-prototype2.ts";
import type { Prototype } from "./prototype.ts";

/** The client: creates new objects by asking prototypes to clone themselves. */
export const prototypeExample: Example = {
  id: "prototype",
  run(out) {
    out.line("Executing Prototype Pattern Implementation");
    const original = new ConcretePrototype1("alpha");
    const clone = original.clone();
    out.line(`  Original: ${original.describe()}`);
    out.line(`  Clone: ${clone.describe()}`);
    out.line(`  Clone is a distinct object: ${String(clone !== original)}`);
    clone.setState("beta");
    out.line(`  Clone after setState(beta): ${clone.describe()}`);
    out.line(`  Original after the clone changed: ${original.describe()}`);
    const second: Prototype = new ConcretePrototype2("gamma");
    out.line(`  ConcretePrototype2 clone: ${second.clone().describe()}`);
  },
};
