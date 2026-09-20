package com.penapereira.patterns.protectionproxy;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.Test;

class ProtectionProxyTest {

    @Test
    void anAdminIsForwardedToTheRealSubject() {
        assertEquals("RealSubject.request()", new ProtectionProxy(new RealSubject(), "admin").request());
    }

    @Test
    void aGuestIsDeniedAndTheRealSubjectIsNeverInvoked() {
        AtomicInteger calls = new AtomicInteger();
        Subject counting = () -> {
            calls.incrementAndGet();
            return "secret";
        };
        assertEquals("access denied by ProtectionProxy", new ProtectionProxy(counting, "guest").request());
        assertEquals(0, calls.get());
        assertEquals("secret", new ProtectionProxy(counting, "admin").request());
        assertEquals(1, calls.get());
    }
}
