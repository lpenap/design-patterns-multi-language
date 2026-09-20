package com.penapereira.patterns.monostate;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: two ordinary instances that turn out to share their state. */
public final class MonostateExample implements Example {

    @Override
    public String id() {
        return "monostate";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Monostate Pattern Implementation");
        Monostate a = new Monostate();
        Monostate b = new Monostate();
        out.line("  Two instances are distinct objects: " + (a != b));
        a.setValue(42);
        out.line("  a.setValue(42) then b.getValue(): " + b.getValue());
        b.setValue(7);
        out.line("  b.setValue(7) then a.getValue(): " + a.getValue());
    }
}
