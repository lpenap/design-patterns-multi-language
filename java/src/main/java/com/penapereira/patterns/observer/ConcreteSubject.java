package com.penapereira.patterns.observer;

/** Holds the state of interest and notifies when it changes. */
public final class ConcreteSubject extends Subject {

    private int state;

    public int getState() {
        return state;
    }

    public void setState(int newState) {
        if (newState == state) {
            return;
        }
        int oldState = state;
        state = newState;
        notifyObservers(oldState, newState);
    }
}
