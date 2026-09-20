package com.penapereira.patterns.virtualproxy;

/** The expensive object the proxy stands in for. */
public final class RealSubject implements Subject {

    @Override
    public String request() {
        return "RealSubject.request()";
    }
}
