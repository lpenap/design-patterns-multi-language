package com.penapereira.patterns.chainofresponsibility;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class ChainOfResponsibilityExampleTest {

    @Test
    void printsTheExpectedLines() {
        ChainOfResponsibilityExample example = new ChainOfResponsibilityExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("chain-of-responsibility", example.id());
        assertEquals(List.of("Executing Chain of Responsibility Pattern Implementation",
                "  -1 is negative", "  0 is zero", "  1 is positive"), lines);
    }
}
