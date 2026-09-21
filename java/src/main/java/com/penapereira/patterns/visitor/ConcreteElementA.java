package com.penapereira.patterns.visitor;

/** Element A; accepts a visitor and exposes operationA to it. */
public final class ConcreteElementA implements Element {

    @Override
    public void accept(Visitor visitor) {
        visitor.visitConcreteElementA(this);
    }

    public String operationA() {
        return "A";
    }
}
