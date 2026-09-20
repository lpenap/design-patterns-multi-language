package com.penapereira.patterns.mediator;

/** Defines the interface for communicating with colleagues. */
public interface Mediator {

    void notify(Colleague sender, String message);
}
