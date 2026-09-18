package com.penapereira.patterns.templatemethod;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class TemplateMethodExampleTest {

    @Test
    void printsTheExpectedLines() {
        TemplateMethodExample example = new TemplateMethodExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("template-method", example.id());
        assertEquals(List.of("Executing Template Method Pattern Implementation",
                "  ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2",
                "  ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook"), lines);
    }
}
