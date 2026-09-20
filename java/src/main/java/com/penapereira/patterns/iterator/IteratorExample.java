package com.penapereira.patterns.iterator;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;
import java.util.ArrayList;
import java.util.List;

/** The client: traverses through the Iterator interface only. */
public final class IteratorExample implements Example {

    @Override
    public String id() {
        return "iterator";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Iterator Pattern Implementation");
        ConcreteAggregate aggregate = new ConcreteAggregate();
        for (String item : new String[] {"a", "b", "c"}) {
            aggregate.add(item);
        }
        List<String> visited = new ArrayList<>();
        for (Iterator it = aggregate.createIterator(); it.hasNext();) {
            visited.add(it.next());
        }
        out.line("  ConcreteIterator traversal: " + String.join(" ", visited));
        Iterator first = aggregate.createIterator();
        Iterator second = aggregate.createIterator();
        out.line("  Two iterators are independent: first.next()=" + first.next() + ", second.next()=" + second.next());
    }
}
