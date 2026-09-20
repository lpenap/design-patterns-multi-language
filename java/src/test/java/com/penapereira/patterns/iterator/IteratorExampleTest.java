package com.penapereira.patterns.iterator;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class IteratorExampleTest {

    @Test
    void printsTheExpectedLines() {
        IteratorExample example = new IteratorExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("iterator", example.id());
        assertEquals(List.of("Executing Iterator Pattern Implementation",
                "  ConcreteIterator traversal: a b c",
                "  Two iterators are independent: first.next()=a, second.next()=a"), lines);
    }
}
