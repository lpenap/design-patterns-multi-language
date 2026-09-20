package com.penapereira.patterns.iterator;

import java.util.NoSuchElementException;

/** Keeps track of the current position in the traversal. */
public final class ConcreteIterator implements Iterator {

    private final ConcreteAggregate aggregate;
    private int index;

    ConcreteIterator(ConcreteAggregate aggregate) {
        this.aggregate = aggregate;
    }

    @Override
    public boolean hasNext() {
        return index < aggregate.count();
    }

    @Override
    public String next() {
        if (!hasNext()) {
            throw new NoSuchElementException("no more elements");
        }
        return aggregate.get(index++);
    }
}
