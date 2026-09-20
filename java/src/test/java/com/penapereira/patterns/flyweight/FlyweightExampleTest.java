package com.penapereira.patterns.flyweight;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class FlyweightExampleTest {

    @Test
    void printsTheExpectedLines() {
        FlyweightExample example = new FlyweightExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("flyweight", example.id());
        assertEquals(List.of("Executing Flyweight Pattern Implementation",
                "  ConcreteFlyweight(a) with extrinsic state 1",
                "  ConcreteFlyweight(b) with extrinsic state 2",
                "  ConcreteFlyweight(a) with extrinsic state 3",
                "  Flyweights created: 2 for 3 requests"), lines);
    }
}
