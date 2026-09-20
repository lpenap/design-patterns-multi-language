package com.penapereira.patterns.virtualproxy;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.Test;

class VirtualProxyTest {

    @Test
    void constructingTheProxyDoesNotCreateTheRealSubject() {
        AtomicInteger creations = new AtomicInteger();
        VirtualProxy proxy = new VirtualProxy(() -> {
            creations.incrementAndGet();
            return new RealSubject();
        });
        assertFalse(proxy.isLoaded());
        assertEquals(0, creations.get());
    }

    @Test
    void theRealSubjectIsCreatedOnceAndReusedForEveryRequest() {
        AtomicInteger creations = new AtomicInteger();
        VirtualProxy proxy = new VirtualProxy(() -> {
            creations.incrementAndGet();
            return new RealSubject();
        });
        assertEquals("RealSubject.request()", proxy.request());
        assertTrue(proxy.isLoaded());
        proxy.request();
        proxy.request();
        assertEquals(1, creations.get());
    }
}
