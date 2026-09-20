package com.penapereira.patterns.bridge;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class BridgeExampleTest {

    @Test
    void printsTheExpectedLines() {
        BridgeExample example = new BridgeExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("bridge", example.id());
        assertEquals(List.of("Executing Bridge Pattern Implementation",
                "  Abstraction(ConcreteImplementorA)", "  Abstraction(ConcreteImplementorB)",
                "  RefinedAbstraction(ConcreteImplementorA)", "  RefinedAbstraction(ConcreteImplementorB)"), lines);
    }
}
