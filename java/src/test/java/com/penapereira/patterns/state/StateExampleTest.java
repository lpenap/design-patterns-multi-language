package com.penapereira.patterns.state;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class StateExampleTest {

    @Test
    void printsTheExpectedLines() {
        StateExample example = new StateExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("state", example.id());
        assertEquals(List.of("Executing State Pattern Implementation",
                "  Context in ConcreteStateA",
                "  request() handled by ConcreteStateA, now in ConcreteStateB",
                "  request() handled by ConcreteStateB, now in ConcreteStateA"), lines);
    }
}
