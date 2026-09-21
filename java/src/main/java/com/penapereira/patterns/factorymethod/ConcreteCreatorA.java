package com.penapereira.patterns.factorymethod;

/** Overrides the factory method to return a ConcreteProductA. */
public final class ConcreteCreatorA extends Creator {

    @Override
    protected Product factoryMethod() {
        return new ConcreteProductA();
    }
}
