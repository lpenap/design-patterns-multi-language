package com.penapereira.patterns.mediator;

import java.util.ArrayList;
import java.util.List;

/** Knows its mediator and communicates with it, never with other colleagues. */
public abstract class Colleague {

    private final Mediator mediator;
    private final List<String> received = new ArrayList<>();

    protected Colleague(Mediator mediator) {
        this.mediator = mediator;
    }

    public void send(String message) {
        mediator.notify(this, message);
    }

    public void receive(String message) {
        received.add(message);
    }

    public List<String> received() {
        return List.copyOf(received);
    }

    public abstract String name();
}
