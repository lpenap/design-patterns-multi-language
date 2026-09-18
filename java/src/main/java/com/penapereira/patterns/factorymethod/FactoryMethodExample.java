package com.penapereira.patterns.factorymethod;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: uses creators through the Creator type only. */
public final class FactoryMethodExample implements Example {

    @Override
    public String id() {
        return "factory-method";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Factory Method Pattern Implementation");
        for (Creator creator : new Creator[] {new ConcreteCreatorA(), new ConcreteCreatorB()}) {
            out.line("  " + creator.anOperation());
        }
    }
}
