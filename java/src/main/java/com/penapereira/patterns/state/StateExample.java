package com.penapereira.patterns.state;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: issues requests to the context and never touches the states. */
public final class StateExample implements Example {

    @Override
    public String id() {
        return "state";
    }

    @Override
    public void run(Output out) {
        out.line("Executing State Pattern Implementation");
        Context context = new Context(new ConcreteStateA());
        out.line("  Context in " + context.getStateName());
        out.line("  " + context.request());
        out.line("  " + context.request());
    }
}
