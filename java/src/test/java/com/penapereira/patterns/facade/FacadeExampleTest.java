package com.penapereira.patterns.facade;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class FacadeExampleTest {

    @Test
    void printsTheExpectedLines() {
        FacadeExample example = new FacadeExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("facade", example.id());
        assertEquals(List.of("Executing Facade Pattern Implementation",
                "  Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC"), lines);
    }
}
