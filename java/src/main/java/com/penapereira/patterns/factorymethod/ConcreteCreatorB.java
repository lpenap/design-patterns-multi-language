package com.penapereira.patterns.factorymethod;

/** Overrides the factory method to return a ConcreteProductB. */
public final class ConcreteCreatorB extends Creator {

    @Override
    protected Product factoryMethod() {
        return new ConcreteProductB();
    }
}
