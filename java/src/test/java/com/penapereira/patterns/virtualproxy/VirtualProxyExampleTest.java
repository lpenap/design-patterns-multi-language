package com.penapereira.patterns.virtualproxy;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class VirtualProxyExampleTest {

    @Test
    void printsTheExpectedLines() {
        VirtualProxyExample example = new VirtualProxyExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("virtual-proxy", example.id());
        assertEquals(List.of("Executing Virtual Proxy Pattern Implementation",
                "  Proxy created, real subject loaded: false",
                "  RealSubject.request()", "  RealSubject.request()",
                "  Real subject loaded: true, created 1 time"), lines);
    }
}
