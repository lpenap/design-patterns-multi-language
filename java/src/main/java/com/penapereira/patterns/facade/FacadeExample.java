package com.penapereira.patterns.facade;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: talks to the facade only. */
public final class FacadeExample implements Example {

    @Override
    public String id() {
        return "facade";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Facade Pattern Implementation");
        out.line("  " + new Facade().operation());
    }
}
