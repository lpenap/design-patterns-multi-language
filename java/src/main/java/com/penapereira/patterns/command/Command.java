package com.penapereira.patterns.command;

/** Declares the interface for executing and undoing an operation. */
public interface Command {

    void execute();

    void undo();

    String describe();
}
