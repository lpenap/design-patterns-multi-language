package com.penapereira.patterns.monostate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotSame;

import org.junit.jupiter.api.Test;

class MonostateTest {

    @Test
    void instancesAreDistinctObjects() {
        assertNotSame(new Monostate(), new Monostate());
    }

    @Test
    void aWriteThroughOneInstanceIsVisibleThroughAll() {
        Monostate a = new Monostate();
        Monostate b = new Monostate();
        a.setValue(11);
        assertEquals(11, b.getValue());
        b.setValue(22);
        assertEquals(22, a.getValue());
    }

    @Test
    void anInstanceCreatedLaterSeesTheSharedState() {
        new Monostate().setValue(33);
        assertEquals(33, new Monostate().getValue());
    }
}
