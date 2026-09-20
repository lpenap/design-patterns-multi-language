package com.penapereira.patterns.bridge;

public final class ConcreteImplementorA implements Implementor {

    @Override
    public String operationImpl() {
        return "ConcreteImplementorA";
    }
}
