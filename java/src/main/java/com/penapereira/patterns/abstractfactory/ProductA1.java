package com.penapereira.patterns.abstractfactory;

/** Product A of family 1, created by ConcreteFactory1. */
public final class ProductA1 implements AbstractProductA {

    @Override
    public String name() {
        return "ProductA1";
    }
}
