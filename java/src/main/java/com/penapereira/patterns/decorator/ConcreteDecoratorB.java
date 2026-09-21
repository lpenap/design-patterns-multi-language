package com.penapereira.patterns.decorator;

/** Wraps a component and adds behaviour B around its operation. */
public final class ConcreteDecoratorB extends Decorator {

    public ConcreteDecoratorB(Component component) {
        super(component);
    }

    @Override
    public String operation() {
        return "ConcreteDecoratorB(" + super.operation() + ")";
    }
}
