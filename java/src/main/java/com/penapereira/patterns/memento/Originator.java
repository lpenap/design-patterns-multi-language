package com.penapereira.patterns.memento;

/** Creates mementos of its state and restores itself from them. */
public final class Originator {

    /** The snapshot. Only Originator can read the private field: the wide interface. */
    public static final class Memento {

        private final String state;

        private Memento(String state) {
            this.state = state;
        }
    }

    private String state = "";

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public Memento createMemento() {
        return new Memento(state);
    }

    public void restore(Memento memento) {
        state = memento.state;
    }
}
