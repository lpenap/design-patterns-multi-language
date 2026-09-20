package com.penapereira.patterns.monostate;

/** All state is static; instances are ordinary objects that share it. */
public final class Monostate {

    private static int value;

    public int getValue() {
        return value;
    }

    public void setValue(int newValue) {
        value = newValue;
    }
}
