package com.penapereira.patterns.composite;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class CompositeExampleTest {

    @Test
    void printsTheExpectedLines() {
        CompositeExample example = new CompositeExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("composite", example.id());
        assertEquals(List.of("Executing Composite Pattern Implementation",
                "  Leaf(A)", "  Composite(Leaf(A)+Leaf(B)+Composite(Leaf(C)))"), lines);
    }
}
