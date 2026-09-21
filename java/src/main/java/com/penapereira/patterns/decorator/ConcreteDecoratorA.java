package com.penapereira.patterns.decorator;

/** Wraps a component and adds behaviour A around its operation. */
public final class ConcreteDecoratorA extends Decorator {

    public ConcreteDecoratorA(Component component) {
        super(component);
    }

    @Override
    public String operation() {
        return "ConcreteDecoratorA(" + super.operation() + ")";
    }
}
