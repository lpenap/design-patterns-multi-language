package com.penapereira.patterns.simplefactory;

/** Product variant A, created by the factory for type code "A". */
public final class ConcreteProductA implements Product {

    @Override
    public String name() {
        return "ConcreteProductA";
    }
}
