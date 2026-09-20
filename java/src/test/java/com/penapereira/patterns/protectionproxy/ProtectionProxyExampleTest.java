package com.penapereira.patterns.protectionproxy;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class ProtectionProxyExampleTest {

    @Test
    void printsTheExpectedLines() {
        ProtectionProxyExample example = new ProtectionProxyExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("protection-proxy", example.id());
        assertEquals(List.of("Executing Protection Proxy Pattern Implementation",
                "  admin: RealSubject.request()", "  guest: access denied by ProtectionProxy"), lines);
    }
}
