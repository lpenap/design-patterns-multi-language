package com.penapereira.patterns.state;

public final class ConcreteStateA implements State {

    @Override
    public void handle(Context context) {
        context.setState(new ConcreteStateB());
    }

    @Override
    public String name() {
        return "ConcreteStateA";
    }
}
