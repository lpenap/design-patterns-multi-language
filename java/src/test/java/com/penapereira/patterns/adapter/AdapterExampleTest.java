package com.penapereira.patterns.adapter;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class AdapterExampleTest {

    @Test
    void printsTheExpectedLines() {
        AdapterExample example = new AdapterExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("adapter", example.id());
        assertEquals(List.of("Executing Adapter Pattern Implementation", "  Adapter(Adaptee)"), lines);
    }
}
