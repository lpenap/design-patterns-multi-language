package com.penapereira.patterns.protectionproxy;

/** The object the proxy represents. */
public final class RealSubject implements Subject {

    @Override
    public String request() {
        return "RealSubject.request()";
    }
}
