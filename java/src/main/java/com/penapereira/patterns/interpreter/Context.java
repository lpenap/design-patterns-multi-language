package com.penapereira.patterns.interpreter;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

/** Information global to the interpreter: the variable bindings. */
public final class Context {

    private final Map<String, Integer> variables = new HashMap<>();

    public Context assign(String name, int value) {
        variables.put(name, value);
        return this;
    }

    public int lookup(String name) {
        Integer value = variables.get(name);
        if (value == null) {
            throw new NoSuchElementException("undefined variable: " + name);
        }
        return value;
    }
}
