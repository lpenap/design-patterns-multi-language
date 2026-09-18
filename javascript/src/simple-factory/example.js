import { SimpleFactory } from "./simple-factory.js";

/** The client: requests products by type code and uses them only through `name()`. */
export const simpleFactoryExample = {
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
