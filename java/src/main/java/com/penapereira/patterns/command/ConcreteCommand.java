package com.penapereira.patterns.command;

/** Binds a receiver to an action and knows how to reverse it. */
public final class ConcreteCommand implements Command {

    private final Receiver receiver;
    private final String word;

    public ConcreteCommand(Receiver receiver, String word) {
        this.receiver = receiver;
        this.word = word;
    }

    @Override
    public void execute() {
        receiver.action(word);
    }

    @Override
    public void undo() {
        receiver.reverse(word);
    }

    @Override
    public String describe() {
        return "ConcreteCommand(" + word + ")";
    }
}
