package com.penapereira.patterns.decorator;

public final class ConcreteDecoratorB extends Decorator {

    public ConcreteDecoratorB(Component component) {
        super(component);
    }

    @Override
    public String operation() {
        return "ConcreteDecoratorB(" + super.operation() + ")";
    }
}
