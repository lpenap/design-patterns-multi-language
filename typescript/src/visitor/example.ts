import type { Example } from "../runtime/contract.ts";
import { ConcreteElementA } from "./concrete-element-a.ts";
import { ConcreteElementB } from "./concrete-element-b.ts";
import { ConcreteVisitor1 } from "./concrete-visitor1.ts";
import { ConcreteVisitor2 } from "./concrete-visitor2.ts";
import { ObjectStructure } from "./object-structure.ts";

/** The client: creates visitors and applies them to the structure. */
export const visitorExample: Example = {
  id: "visitor",
  run(out) {
    out.line("Executing Visitor Pattern Implementation");
    const structure = new ObjectStructure();
    structure.add(new ConcreteElementA());
    structure.add(new ConcreteElementB());
    const first = new ConcreteVisitor1();
    structure.accept(first);
    out.line(`  ConcreteVisitor1: ${first.result()}`);
    const second = new ConcreteVisitor2();
    structure.accept(second);
    out.line(`  ConcreteVisitor2: ${second.result()}`);
  },
};
