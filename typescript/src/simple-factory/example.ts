import type { Example } from "../runtime/contract.ts";
import { SimpleFactory } from "./simple-factory.ts";

/** The client: requests products by type code and uses them through Product. */
export const simpleFactoryExample: Example = {
  id: "simple-factory",
  run(out) {
    out.line("Executing Simple Factory Pattern Implementation");
    const factory = new SimpleFactory();
    const a = factory.createProduct("A");
    const b = factory.createProduct("B");
    out.line(`  ${a.name()}`);
    out.line(`  ${b.name()}`);
  },
};
