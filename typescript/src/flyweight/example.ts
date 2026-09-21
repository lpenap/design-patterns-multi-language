import type { Example } from "../runtime/contract.ts";
import { FlyweightFactory } from "./flyweight-factory.ts";

/** The client: keeps the extrinsic state and obtains flyweights from the factory only. */
export const flyweightExample: Example = {
  id: "flyweight",
  run(out) {
    out.line("Executing Flyweight Pattern Implementation");
    const factory = new FlyweightFactory();
    const keys = ["a", "b", "a"];
    keys.forEach((key, i) => {
      out.line(`  ${factory.getFlyweight(key).operation(i + 1)}`);
    });
    out.line(`  Flyweights created: ${String(factory.count())} for ${String(keys.length)} requests`);
  },
};
