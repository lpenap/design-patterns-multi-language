import { ConcretePrototype1, ConcretePrototype2 } from "./prototype.js";

/** The client: creates new objects by asking prototypes to clone themselves. */
export const prototypeExample = {
  id: "prototype",
  run(out) {
    out.line("Executing Prototype Pattern Implementation");
    const original = new ConcretePrototype1("alpha");
    const clone = original.clone();
    out.line(`  Original: ${original.describe()}`);
    out.line(`  Clone: ${clone.describe()}`);
    out.line(`  Clone is a distinct object: ${clone !== original}`);
    clone.setState("beta");
    out.line(`  Clone after setState(beta): ${clone.describe()}`);
    out.line(`  Original after the clone changed: ${original.describe()}`);
    out.line(`  ConcretePrototype2 clone: ${new ConcretePrototype2("gamma").clone().describe()}`);
  },
};
