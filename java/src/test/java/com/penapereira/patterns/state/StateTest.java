package com.penapereira.patterns.state;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class StateTest {

    @Test
    void statesAlternateOnEachRequest() {
        Context context = new Context(new ConcreteStateA());
        assertEquals("ConcreteStateA", context.getStateName());
        context.request();
        assertEquals("ConcreteStateB", context.getStateName());
        context.request();
        assertEquals("ConcreteStateA", context.getStateName());
        context.request();
        assertEquals("ConcreteStateB", context.getStateName());
    }

    @Test
    void theStateDecidesTheTransition() {
        State stuck = new State() {
            @Override
            public void handle(Context context) {
                // stays where it is
            }

            @Override
            public String name() {
                return "Stuck";
            }
        };
        Context context = new Context(stuck);
        assertEquals("request() handled by Stuck, now in Stuck", context.request());
    }

    @Test
    void aStateInstanceCanServeSeveralContexts() {
        State shared = new ConcreteStateA();
        Context one = new Context(shared);
        Context two = new Context(shared);
        one.request();
        assertEquals("ConcreteStateB", one.getStateName());
        assertEquals("ConcreteStateA", two.getStateName());
    }
}
