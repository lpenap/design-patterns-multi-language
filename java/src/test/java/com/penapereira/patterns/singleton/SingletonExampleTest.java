package com.penapereira.patterns.singleton;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class SingletonExampleTest {

    @Test
    void printsTheExpectedLines() {
        SingletonExample example = new SingletonExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("singleton", example.id());
        assertEquals(List.of("Executing Singleton Pattern Implementation",
                "  Same instance returned twice: true", "  Singleton is doing something"), lines);
    }
}
