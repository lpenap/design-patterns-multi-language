package com.penapereira.patterns.adapter;

/** Object adapter: implements Target by delegating to the Adaptee it holds. */
public final class Adapter implements Target {

    private final Adaptee adaptee;

    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    @Override
    public String request() {
        return "Adapter(" + adaptee.specificRequest() + ")";
    }
}
