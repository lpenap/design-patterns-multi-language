package com.penapereira.patterns.virtualproxy;

import java.util.function.Supplier;

/** Creates the real subject on the first request and forwards every request to it. */
public final class VirtualProxy implements Subject {

    private final Supplier<Subject> loader;
    private Subject realSubject;

    public VirtualProxy(Supplier<Subject> loader) {
        this.loader = loader;
    }

    @Override
    public String request() {
        if (realSubject == null) {
            realSubject = loader.get();
        }
        return realSubject.request();
    }

    public boolean isLoaded() {
        return realSubject != null;
    }
}
