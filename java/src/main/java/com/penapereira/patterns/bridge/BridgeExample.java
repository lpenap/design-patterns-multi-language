package com.penapereira.patterns.bridge;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: combines each abstraction with each implementor. */
public final class BridgeExample implements Example {

    @Override
    public String id() {
        return "bridge";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Bridge Pattern Implementation");
        Implementor[] implementors = {new ConcreteImplementorA(), new ConcreteImplementorB()};
        for (Implementor implementor : implementors) {
            out.line("  " + new Abstraction(implementor).operation());
        }
        for (Implementor implementor : implementors) {
            out.line("  " + new RefinedAbstraction(implementor).operation());
        }
    }
}
