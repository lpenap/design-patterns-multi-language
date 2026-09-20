package com.penapereira.patterns.flyweight;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotSame;
import static org.junit.jupiter.api.Assertions.assertSame;

import org.junit.jupiter.api.Test;

class FlyweightTest {

    @Test
    void theSameKeyYieldsTheSameObject() {
        FlyweightFactory factory = new FlyweightFactory();
        assertSame(factory.getFlyweight("a"), factory.getFlyweight("a"));
        assertNotSame(factory.getFlyweight("a"), factory.getFlyweight("b"));
    }

    @Test
    void thePoolGrowsOnlyWithDistinctKeys() {
        FlyweightFactory factory = new FlyweightFactory();
        for (String key : new String[] {"x", "y", "x", "x", "z"}) {
            factory.getFlyweight(key);
        }
        assertEquals(3, factory.count());
    }

    @Test
    void operationCombinesIntrinsicAndExtrinsicState() {
        assertEquals("ConcreteFlyweight(q) with extrinsic state 42", new ConcreteFlyweight("q").operation(42));
    }
}
