package com.penapereira.patterns.factorymethod;

public final class ConcreteCreatorA extends Creator {

    @Override
    protected Product factoryMethod() {
        return new ConcreteProductA();
    }
}
