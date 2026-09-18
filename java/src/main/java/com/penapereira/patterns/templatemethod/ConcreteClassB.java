package com.penapereira.patterns.templatemethod;

public final class ConcreteClassB extends AbstractClass {

    @Override
    protected String primitiveOperation1() {
        return "ConcreteClassB.primitiveOperation1";
    }

    @Override
    protected String primitiveOperation2() {
        return "ConcreteClassB.primitiveOperation2";
    }

    @Override
    protected String hook() {
        return " with hook";
    }
}
