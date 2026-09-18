import type { Example } from "../runtime/contract.ts";
import { Singleton } from "./singleton.ts";

/** The client: obtains the instance through instance() only. */
export const singletonExample: Example = {
  id: "singleton",
  run(out) {
    out.line("Executing Singleton Pattern Implementation");
    const first = Singleton.instance();
    const second = Singleton.instance();
    out.line(`  Same instance returned twice: ${String(first === second)}`);
    out.line(`  ${first.doSomething()}`);
  },
};
