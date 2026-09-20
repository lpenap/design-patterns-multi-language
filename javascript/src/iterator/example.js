import { ConcreteAggregate } from "./iterator.js";

/** The client: traverses through hasNext()/next() only. */
export const iteratorExample = {
  id: "iterator",
  run(out) {
    out.line("Executing Iterator Pattern Implementation");
    const aggregate = new ConcreteAggregate();
    for (const item of ["a", "b", "c"]) {
      aggregate.add(item);
    }
    const visited = [];
    for (const it = aggregate.createIterator(); it.hasNext(); ) {
      visited.push(it.next());
    }
    out.line(`  ConcreteIterator traversal: ${visited.join(" ")}`);
    const first = aggregate.createIterator();
    const second = aggregate.createIterator();
    out.line(`  Two iterators are independent: first.next()=${first.next()}, second.next()=${second.next()}`);
  },
};
