package com.penapereira.patterns.strategy;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class StrategyExampleTest {

    @Test
    void idMatchesTheCatalog() {
        assertEquals("strategy", new StrategyExample().id());
    }

    @Test
    void printsTheExpectedLines() {
        List<String> lines = new ArrayList<>();
        new StrategyExample().run(lines::add);
        assertEquals(List.of(
                "Executing Strategy Pattern Implementation",
                "  Operation with --> algorithm from ConcreteStrategyA",
                "  Operation with ==> algorithm from ConcreteStrategyB"), lines);
    }
}
