package com.penapereira.patterns.adapter;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: collaborates through Target only. */
public final class AdapterExample implements Example {

    @Override
    public String id() {
        return "adapter";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Adapter Pattern Implementation");
        Target target = new Adapter(new Adaptee());
        out.line("  " + target.request());
    }
}
