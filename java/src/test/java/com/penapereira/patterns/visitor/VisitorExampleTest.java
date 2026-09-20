package com.penapereira.patterns.visitor;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class VisitorExampleTest {

    @Test
    void printsTheExpectedLines() {
        VisitorExample example = new VisitorExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("visitor", example.id());
        assertEquals(List.of("Executing Visitor Pattern Implementation",
                "  ConcreteVisitor1: visited ConcreteElementA, visited ConcreteElementB",
                "  ConcreteVisitor2: A+B"), lines);
    }
}
