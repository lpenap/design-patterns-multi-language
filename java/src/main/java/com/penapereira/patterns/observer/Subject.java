package com.penapereira.patterns.observer;

import java.util.ArrayList;
import java.util.List;

/** Knows its observers and notifies them in attachment order. */
public class Subject {

    private final List<Observer> observers = new ArrayList<>();

    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void detach(Observer observer) {
        observers.remove(observer);
    }

    protected void notifyObservers(int oldState, int newState) {
        for (Observer observer : List.copyOf(observers)) {
            observer.update(oldState, newState);
        }
    }
}
