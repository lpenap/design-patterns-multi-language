import type { Example } from "../runtime/contract.ts";
import { type Component, Composite, Leaf } from "./composite.ts";

/** The client: manipulates leaves and trees through Component alike. */
export const compositeExample: Example = {
  id: "composite",
  run(out) {
    out.line("Executing Composite Pattern Implementation");
    const leaf: Component = new Leaf("A");
    const tree: Component = new Composite().add(new Leaf("A")).add(new Leaf("B")).add(new Composite().add(new Leaf("C")));
    out.line(`  ${leaf.operation()}`);
    out.line(`  ${tree.operation()}`);
  },
};
