package com.penapereira.patterns.singleton;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;

import org.junit.jupiter.api.Test;

class SingletonTest {

    @Test
    void instanceReturnsTheSameObjectEveryTime() {
        assertSame(Singleton.instance(), Singleton.instance());
    }

    @Test
    void theInstanceDoesItsWork() {
        assertEquals("Singleton is doing something", Singleton.instance().doSomething());
    }
}
