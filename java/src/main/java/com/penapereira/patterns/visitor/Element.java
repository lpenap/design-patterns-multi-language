package com.penapereira.patterns.visitor;

/** Accepts a visitor and dispatches to the visit method for its own class. */
public interface Element {

    void accept(Visitor visitor);
}
