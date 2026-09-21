package com.penapereira.patterns.state;

/** State B; handling a request moves the context to ConcreteStateA. */
public final class ConcreteStateB implements State {

    @Override
    public void handle(Context context) {
        context.setState(new ConcreteStateA());
    }

    @Override
    public String name() {
        return "ConcreteStateB";
    }
}
