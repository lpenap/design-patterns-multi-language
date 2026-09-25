package com.penapereira.patterns.nullobject;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class NullObjectExampleTest {

    @Test
    void printsTheExpectedLines() {
        NullObjectExample example = new NullObjectExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("null-object", example.id());
        assertEquals(List.of("Executing Null Object Pattern Implementation",
                "  OrderProcessor with OutputLogger:",
                "    [log] processing order 1",
                "    [log] processing order 2",
                "    processed 2 orders",
                "  OrderProcessor with NullLogger:",
                "    processed 2 orders",
                "  The processor never tested its logger for null"), lines);
    }
}
