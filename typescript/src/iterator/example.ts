import type { Example } from "../runtime/contract.ts";
import { ConcreteAggregate } from "./iterator.ts";

/** The client: traverses through the Iterator interface only. */
export const iteratorExample: Example = {
  id: "iterator",
  run(out) {
    out.line("Executing Iterator Pattern Implementation");
    const aggregate = new ConcreteAggregate();
    for (const item of ["a", "b", "c"]) {
      aggregate.add(item);
    }
    const visited: string[] = [];
    for (const it = aggregate.createIterator(); it.hasNext(); ) {
      visited.push(it.next());
    }
    out.line(`  ConcreteIterator traversal: ${visited.join(" ")}`);
    const first = aggregate.createIterator();
    const second = aggregate.createIterator();
    out.line(`  Two iterators are independent: first.next()=${first.next()}, second.next()=${second.next()}`);
  },
};
