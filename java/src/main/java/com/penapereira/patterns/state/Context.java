package com.penapereira.patterns.state;

/** Holds the current state and delegates state-specific requests to it. */
public final class Context {

    private State state;

    public Context(State initial) {
        this.state = initial;
    }

    public String request() {
        String before = state.name();
        state.handle(this);
        return "request() handled by " + before + ", now in " + state.name();
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getStateName() {
        return state.name();
    }
}
