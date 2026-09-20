package com.penapereira.patterns.builder;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class BuilderExampleTest {

    @Test
    void printsTheExpectedLines() {
        BuilderExample example = new BuilderExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("builder", example.id());
        assertEquals(List.of("Executing Builder Pattern Implementation",
                "  Director.construct(ConcreteBuilder): Product(PartA, PartB)",
                "  ConcreteBuilder alone, only part B: Product(PartB)"), lines);
    }
}
