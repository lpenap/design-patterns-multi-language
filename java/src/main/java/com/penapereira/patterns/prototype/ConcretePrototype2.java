package com.penapereira.patterns.prototype;

/** Copies its own state through a copy constructor (Bloch, Item 13). */
public final class ConcretePrototype2 implements Prototype {

    private String state;

    public ConcretePrototype2(String state) {
        this.state = state;
    }

    @Override
    public ConcretePrototype2 clone() {
        return new ConcretePrototype2(state);
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String describe() {
        return "ConcretePrototype2(state=" + state + ")";
    }
}
