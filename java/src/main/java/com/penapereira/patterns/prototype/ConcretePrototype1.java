package com.penapereira.patterns.prototype;

/** Copies its own state through a copy constructor (Bloch, Item 13). */
public final class ConcretePrototype1 implements Prototype {

    private String state;

    public ConcretePrototype1(String state) {
        this.state = state;
    }

    @Override
    public ConcretePrototype1 clone() {
        return new ConcretePrototype1(state);
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String describe() {
        return "ConcretePrototype1(state=" + state + ")";
    }
}
