package com.penapereira.patterns.simplefactory;

/** Product variant B, created by the factory for type code "B". */
public final class ConcreteProductB implements Product {

    @Override
    public String name() {
        return "ConcreteProductB";
    }
}
