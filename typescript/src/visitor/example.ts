import type { Example } from "../runtime/contract.ts";
import { ConcreteElementA, ConcreteElementB, ConcreteVisitor1, ConcreteVisitor2, ObjectStructure } from "./visitor.ts";

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
