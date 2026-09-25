package com.penapereira.patterns.nullobject;

/** The null object: honours the interface and does nothing, so clients need no null check. */
public final class NullLogger implements Logger {

    @Override
    public void log(String message) {
        // Intentionally empty: a null object's whole point is to do nothing.
    }
}
