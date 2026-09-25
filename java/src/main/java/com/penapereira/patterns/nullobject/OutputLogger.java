package com.penapereira.patterns.nullobject;

import com.penapereira.patterns.runtime.Output;

/** The real object: writes every message to the output. */
public final class OutputLogger implements Logger {

    private final Output out;

    public OutputLogger(Output out) {
        this.out = out;
    }

    @Override
    public void log(String message) {
        out.line("    [log] " + message);
    }
}
