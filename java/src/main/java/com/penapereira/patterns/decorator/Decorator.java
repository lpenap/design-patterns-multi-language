package com.penapereira.patterns.decorator;

/** Holds the wrapped component and forwards to it; subclasses add behaviour. */
public abstract class Decorator implements Component {

    private final Component component;

    protected Decorator(Component component) {
        this.component = component;
    }

    @Override
    public String operation() {
        return component.operation();
    }
}
