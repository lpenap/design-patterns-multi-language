package com.penapereira.patterns.observer;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class ObserverExampleTest {

    @Test
    void printsTheExpectedLines() {
        ObserverExample example = new ObserverExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("observer", example.id());
        assertEquals(List.of("Executing Observer Pattern Implementation",
                "  observer1 notified: state 0 -> 5",
                "  observer2 notified: state 0 -> 5",
                "  observer1 notified: state 5 -> 10"), lines);
    }
}
