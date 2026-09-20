import { Composite } from "./composite.js";
import { Leaf } from "./leaf.js";

/** The client: manipulates leaves and trees through `operation()` alike. */
export const compositeExample = {
  id: "composite",
  run(out) {
    out.line("Executing Composite Pattern Implementation");
    const leaf = new Leaf("A");
    const tree = new Composite().add(new Leaf("A")).add(new Leaf("B")).add(new Composite().add(new Leaf("C")));
    out.line(`  ${leaf.operation()}`);
    out.line(`  ${tree.operation()}`);
  },
};
