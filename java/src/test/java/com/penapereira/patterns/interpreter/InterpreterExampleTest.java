package com.penapereira.patterns.interpreter;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class InterpreterExampleTest {

    @Test
    void printsTheExpectedLines() {
        InterpreterExample example = new InterpreterExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("interpreter", example.id());
        assertEquals(List.of("Executing Interpreter Pattern Implementation",
                "  Expression: ((x + 3) - y)", "  With x = 5, y = 2: 6", "  With x = 10, y = 0: 13"), lines);
    }
}
