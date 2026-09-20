package com.penapereira.patterns.monostate;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class MonostateExampleTest {

    @Test
    void printsTheExpectedLines() {
        MonostateExample example = new MonostateExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("monostate", example.id());
        assertEquals(List.of("Executing Monostate Pattern Implementation",
                "  Two instances are distinct objects: true",
                "  a.setValue(42) then b.getValue(): 42",
                "  b.setValue(7) then a.getValue(): 7"), lines);
    }
}
