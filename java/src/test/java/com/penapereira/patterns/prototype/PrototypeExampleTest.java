package com.penapereira.patterns.prototype;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class PrototypeExampleTest {

    @Test
    void printsTheExpectedLines() {
        PrototypeExample example = new PrototypeExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("prototype", example.id());
        assertEquals(List.of("Executing Prototype Pattern Implementation",
                "  Original: ConcretePrototype1(state=alpha)",
                "  Clone: ConcretePrototype1(state=alpha)",
                "  Clone is a distinct object: true",
                "  Clone after setState(beta): ConcretePrototype1(state=beta)",
                "  Original after the clone changed: ConcretePrototype1(state=alpha)",
                "  ConcretePrototype2 clone: ConcretePrototype2(state=gamma)"), lines);
    }
}
