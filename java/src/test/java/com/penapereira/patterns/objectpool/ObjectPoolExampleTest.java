package com.penapereira.patterns.objectpool;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class ObjectPoolExampleTest {

    @Test
    void printsTheExpectedLines() {
        ObjectPoolExample example = new ObjectPoolExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("object-pool", example.id());
        assertEquals(List.of("Executing Object Pool Pattern Implementation",
                "  Task A -> Reusable#1 (use 1)",
                "  Task B -> Reusable#2 (use 1)",
                "  Task C -> pool exhausted, 2 of 2 in use",
                "  Released Reusable#1",
                "  Task C -> Reusable#1 (use 2)",
                "  Created 2 objects for 4 requests"), lines);
    }
}
