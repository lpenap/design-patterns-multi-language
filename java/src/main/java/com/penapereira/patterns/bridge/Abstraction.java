package com.penapereira.patterns.bridge;

/** Holds the implementor and forwards the primitive operation to it. */
public class Abstraction {

    protected final Implementor implementor;

    public Abstraction(Implementor implementor) {
        this.implementor = implementor;
    }

    public String operation() {
        return "Abstraction(" + implementor.operationImpl() + ")";
    }
}
