package com.penapereira.patterns.factorymethod;

/** Declares the factory method and calls it from its template operation. */
public abstract class Creator {

    protected abstract Product factoryMethod();

    public String anOperation() {
        return "Built " + factoryMethod().name();
    }
}
