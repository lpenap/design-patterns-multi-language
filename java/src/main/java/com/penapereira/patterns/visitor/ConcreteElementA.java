package com.penapereira.patterns.visitor;

public final class ConcreteElementA implements Element {

    @Override
    public void accept(Visitor visitor) {
        visitor.visitConcreteElementA(this);
    }

    public String operationA() {
        return "A";
    }
}
