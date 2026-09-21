package com.penapereira.patterns.factorymethod;

/** Product variant A, created by ConcreteCreatorA. */
public final class ConcreteProductA implements Product {

    @Override
    public String name() {
        return "ConcreteProductA";
    }
}
