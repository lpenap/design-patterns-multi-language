import { Singleton } from "./singleton.js";

/** The client: obtains the instance through instance() only. */
export const singletonExample = {
  id: "singleton",
  run(out) {
    out.line("Executing Singleton Pattern Implementation");
    const first = Singleton.instance();
    const second = Singleton.instance();
    out.line(`  Same instance returned twice: ${first === second}`);
    out.line(`  ${first.doSomething()}`);
  },
};
