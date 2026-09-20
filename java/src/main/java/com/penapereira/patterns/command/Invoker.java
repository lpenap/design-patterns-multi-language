package com.penapereira.patterns.command;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Optional;

/** Asks commands to carry out requests and keeps the history for undo. */
public final class Invoker {

    private final Deque<Command> history = new ArrayDeque<>();

    public void execute(Command command) {
        command.execute();
        history.push(command);
    }

    /** Undoes the most recent command and returns it, or empty if there is none. */
    public Optional<Command> undo() {
        Command last = history.poll();
        if (last == null) {
            return Optional.empty();
        }
        last.undo();
        return Optional.of(last);
    }
}
