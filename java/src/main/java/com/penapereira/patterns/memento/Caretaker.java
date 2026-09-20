package com.penapereira.patterns.memento;

import java.util.ArrayDeque;
import java.util.Deque;

/** Keeps mementos safe; never examines their contents (the narrow interface). */
public final class Caretaker {

    private final Deque<Originator.Memento> history = new ArrayDeque<>();

    public void save(Originator originator) {
        history.push(originator.createMemento());
    }

    /** Restores the most recent saved state; false if nothing was saved. */
    public boolean undo(Originator originator) {
        Originator.Memento last = history.poll();
        if (last == null) {
            return false;
        }
        originator.restore(last);
        return true;
    }
}
