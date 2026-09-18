package com.penapereira.patterns.observer;

/** The notification interface; push model: the change is carried in the call. */
public interface Observer {

    void update(int oldState, int newState);
}
