package com.penapereira.patterns.prototype;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: creates new objects by asking prototypes to clone themselves. */
public final class PrototypeExample implements Example {

    @Override
    public String id() {
        return "prototype";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Prototype Pattern Implementation");
        ConcretePrototype1 original = new ConcretePrototype1("alpha");
        ConcretePrototype1 clone = original.clone();
        out.line("  Original: " + original.describe());
        out.line("  Clone: " + clone.describe());
        out.line("  Clone is a distinct object: " + (clone != original));
        clone.setState("beta");
        out.line("  Clone after setState(beta): " + clone.describe());
        out.line("  Original after the clone changed: " + original.describe());
        Prototype second = new ConcretePrototype2("gamma");
        out.line("  ConcretePrototype2 clone: " + second.clone().describe());
    }
}
