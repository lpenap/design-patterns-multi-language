package com.penapereira.patterns.bridge;

/** Implementor variant A; the abstraction never names it. */
public final class ConcreteImplementorA implements Implementor {

    @Override
    public String operationImpl() {
        return "ConcreteImplementorA";
    }
}
