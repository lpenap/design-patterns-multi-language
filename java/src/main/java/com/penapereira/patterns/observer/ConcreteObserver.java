package com.penapereira.patterns.observer;

import java.util.function.Consumer;

/** Reports the change it was told about through a callback supplied by its creator. */
public final class ConcreteObserver implements Observer {

    private final String name;
    private final Consumer<String> report;

    public ConcreteObserver(String name, Consumer<String> report) {
        this.name = name;
        this.report = report;
    }

    @Override
    public void update(int oldState, int newState) {
        report.accept(name + " notified: state " + oldState + " -> " + newState);
    }
}
