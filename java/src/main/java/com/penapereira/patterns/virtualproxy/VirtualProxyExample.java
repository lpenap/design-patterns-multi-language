package com.penapereira.patterns.virtualproxy;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;
import java.util.concurrent.atomic.AtomicInteger;

/** The client: observes that the real subject is created once, at the first request. */
public final class VirtualProxyExample implements Example {

    @Override
    public String id() {
        return "virtual-proxy";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Virtual Proxy Pattern Implementation");
        AtomicInteger creations = new AtomicInteger();
        VirtualProxy proxy = new VirtualProxy(() -> {
            creations.incrementAndGet();
            return new RealSubject();
        });
        out.line("  Proxy created, real subject loaded: " + proxy.isLoaded());
        Subject subject = proxy;
        out.line("  " + subject.request());
        out.line("  " + subject.request());
        out.line("  Real subject loaded: " + proxy.isLoaded() + ", created " + creations.get() + " time");
    }
}
