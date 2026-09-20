import { ConcreteBuilder, Director } from "./builder.js";

/** The client: hands a builder to the director, then uses a builder directly. */
export const builderExample = {
  id: "builder",
  run(out) {
    out.line("Executing Builder Pattern Implementation");
    const built = new Director().construct(new ConcreteBuilder());
    out.line(`  Director.construct(ConcreteBuilder): ${built.describe()}`);
    const alone = new ConcreteBuilder();
    alone.buildPartB();
    out.line(`  ConcreteBuilder alone, only part B: ${alone.getResult().describe()}`);
  },
};
