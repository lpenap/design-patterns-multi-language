package com.penapereira.patterns.memento;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class MementoExampleTest {

    @Test
    void printsTheExpectedLines() {
        MementoExample example = new MementoExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("memento", example.id());
        assertEquals(List.of("Executing Memento Pattern Implementation",
                "  Originator state: A (saved)", "  Originator state: B (saved)",
                "  Originator state: C", "  Restored: B", "  Restored: A"), lines);
    }
}
