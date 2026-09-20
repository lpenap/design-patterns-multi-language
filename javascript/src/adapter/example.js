import { Adaptee } from "./adaptee.js";
import { Adapter } from "./adapter.js";

/** The client: knows the target only by its `request()` method. */
export const adapterExample = {
  id: "adapter",
  run(out) {
    out.line("Executing Adapter Pattern Implementation");
    const target = new Adapter(new Adaptee());
    out.line(`  ${target.request()}`);
  },
};
