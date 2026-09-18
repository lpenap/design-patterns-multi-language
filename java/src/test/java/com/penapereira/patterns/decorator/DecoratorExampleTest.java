package com.penapereira.patterns.decorator;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class DecoratorExampleTest {

    @Test
    void printsTheExpectedLines() {
        DecoratorExample example = new DecoratorExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("decorator", example.id());
        assertEquals(List.of("Executing Decorator Pattern Implementation",
                "  ConcreteDecoratorA(ConcreteComponent)",
                "  ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))"), lines);
    }
}
