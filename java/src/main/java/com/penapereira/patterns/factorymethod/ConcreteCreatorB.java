package com.penapereira.patterns.factorymethod;

public final class ConcreteCreatorB extends Creator {

    @Override
    protected Product factoryMethod() {
        return new ConcreteProductB();
    }
}
