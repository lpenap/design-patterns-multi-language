package com.penapereira.patterns.simplefactory;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class SimpleFactoryExampleTest {

    @Test
    void printsTheExpectedLines() {
        SimpleFactoryExample example = new SimpleFactoryExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("simple-factory", example.id());
        assertEquals(List.of("Executing Simple Factory Pattern Implementation",
                "  ConcreteProductA", "  ConcreteProductB"), lines);
    }
}
