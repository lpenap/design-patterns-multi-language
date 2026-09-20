package com.penapereira.patterns.iterator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.NoSuchElementException;
import org.junit.jupiter.api.Test;

class IteratorTest {

    private static ConcreteAggregate abc() {
        ConcreteAggregate aggregate = new ConcreteAggregate();
        aggregate.add("a");
        aggregate.add("b");
        aggregate.add("c");
        return aggregate;
    }

    @Test
    void traversesInOrderAndStopsAtTheEnd() {
        Iterator it = abc().createIterator();
        assertTrue(it.hasNext());
        assertEquals("a", it.next());
        assertEquals("b", it.next());
        assertEquals("c", it.next());
        assertFalse(it.hasNext());
        assertThrows(NoSuchElementException.class, it::next);
    }

    @Test
    void iteratorsOverOneAggregateAreIndependent() {
        Aggregate aggregate = abc();
        Iterator first = aggregate.createIterator();
        Iterator second = aggregate.createIterator();
        first.next();
        first.next();
        assertEquals("c", first.next());
        assertEquals("a", second.next());
    }

    @Test
    void anEmptyAggregateHasNothingToVisit() {
        ConcreteAggregate empty = new ConcreteAggregate();
        assertEquals(0, empty.count());
        assertFalse(empty.createIterator().hasNext());
    }
}
