package com.penapereira.patterns.visitor;

public final class ConcreteElementB implements Element {

    @Override
    public void accept(Visitor visitor) {
        visitor.visitConcreteElementB(this);
    }

    public String operationB() {
        return "B";
    }
}
