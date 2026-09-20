import type { Example } from "../runtime/contract.ts";
import { type Builder, ConcreteBuilder, Director } from "./builder.ts";

/** The client: hands a builder to the director, then uses a builder directly. */
export const builderExample: Example = {
  id: "builder",
  run(out) {
    out.line("Executing Builder Pattern Implementation");
    const built = new Director().construct(new ConcreteBuilder());
    out.line(`  Director.construct(ConcreteBuilder): ${built.describe()}`);
    const alone: Builder = new ConcreteBuilder();
    alone.buildPartB();
    out.line(`  ConcreteBuilder alone, only part B: ${alone.getResult().describe()}`);
  },
};
