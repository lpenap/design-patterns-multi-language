package com.penapereira.patterns.visitor;

/** Element B; accepts a visitor and exposes operationB to it. */
public final class ConcreteElementB implements Element {

    @Override
    public void accept(Visitor visitor) {
        visitor.visitConcreteElementB(this);
    }

    public String operationB() {
        return "B";
    }
}
