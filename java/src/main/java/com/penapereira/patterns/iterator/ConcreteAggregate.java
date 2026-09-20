package com.penapereira.patterns.iterator;

import java.util.ArrayList;
import java.util.List;

/** Holds the items and hands out iterators over them. */
public final class ConcreteAggregate implements Aggregate {

    private final List<String> items = new ArrayList<>();

    public void add(String item) {
        items.add(item);
    }

    public int count() {
        return items.size();
    }

    /** Package-level access for the iterator; the list itself is never exposed. */
    String get(int index) {
        return items.get(index);
    }

    @Override
    public Iterator createIterator() {
        return new ConcreteIterator(this);
    }
}
