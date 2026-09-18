package com.penapereira.patterns.abstractfactory;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class AbstractFactoryExampleTest {

    @Test
    void printsTheExpectedLines() {
        AbstractFactoryExample example = new AbstractFactoryExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("abstract-factory", example.id());
        assertEquals(List.of("Executing Abstract Factory Pattern Implementation",
                "  ProductA1", "  ProductB1", "  ProductA2", "  ProductB2"), lines);
    }
}
