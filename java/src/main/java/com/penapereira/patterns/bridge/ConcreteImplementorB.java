package com.penapereira.patterns.bridge;

/** Implementor variant B; the abstraction never names it. */
public final class ConcreteImplementorB implements Implementor {

    @Override
    public String operationImpl() {
        return "ConcreteImplementorB";
    }
}
