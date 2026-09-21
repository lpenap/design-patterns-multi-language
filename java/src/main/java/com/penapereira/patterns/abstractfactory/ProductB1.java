package com.penapereira.patterns.abstractfactory;

/** Product B of family 1, created by ConcreteFactory1. */
public final class ProductB1 implements AbstractProductB {

    @Override
    public String name() {
        return "ProductB1";
    }
}
