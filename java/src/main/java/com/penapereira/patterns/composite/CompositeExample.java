package com.penapereira.patterns.composite;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: manipulates leaves and trees through Component alike. */
public final class CompositeExample implements Example {

    @Override
    public String id() {
        return "composite";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Composite Pattern Implementation");
        Component leaf = new Leaf("A");
        Component tree = new Composite()
                .add(new Leaf("A"))
                .add(new Leaf("B"))
                .add(new Composite().add(new Leaf("C")));
        out.line("  " + leaf.operation());
        out.line("  " + tree.operation());
    }
}
