package com.penapereira.patterns.factorymethod;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class FactoryMethodExampleTest {

    @Test
    void printsTheExpectedLines() {
        FactoryMethodExample example = new FactoryMethodExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("factory-method", example.id());
        assertEquals(List.of("Executing Factory Method Pattern Implementation",
                "  Built ConcreteProductA", "  Built ConcreteProductB"), lines);
    }
}
