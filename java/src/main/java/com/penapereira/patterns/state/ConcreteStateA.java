package com.penapereira.patterns.state;

/** State A; handling a request moves the context to ConcreteStateB. */
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
