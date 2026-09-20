package com.penapereira.patterns.mediator;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class MediatorExampleTest {

    @Test
    void printsTheExpectedLines() {
        MediatorExample example = new MediatorExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("mediator", example.id());
        assertEquals(List.of("Executing Mediator Pattern Implementation",
                "  ConcreteColleague1 sends: hello", "  ConcreteColleague2 receives: hello",
                "  ConcreteColleague2 sends: hi", "  ConcreteColleague1 receives: hi"), lines);
    }
}
