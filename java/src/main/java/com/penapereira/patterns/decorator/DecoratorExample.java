package com.penapereira.patterns.decorator;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: uses decorated and undecorated objects alike through Component. */
public final class DecoratorExample implements Example {

    @Override
    public String id() {
        return "decorator";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Decorator Pattern Implementation");
        Component decorated = new ConcreteDecoratorA(new ConcreteComponent());
        out.line("  " + decorated.operation());
        Component twice = new ConcreteDecoratorB(decorated);
        out.line("  " + twice.operation());
    }
}
