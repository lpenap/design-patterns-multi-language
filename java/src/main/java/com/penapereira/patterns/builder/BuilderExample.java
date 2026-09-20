package com.penapereira.patterns.builder;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: hands a builder to the director, then uses a builder directly. */
public final class BuilderExample implements Example {

    @Override
    public String id() {
        return "builder";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Builder Pattern Implementation");
        Product built = new Director().construct(new ConcreteBuilder());
        out.line("  Director.construct(ConcreteBuilder): " + built.describe());
        Builder alone = new ConcreteBuilder();
        alone.buildPartB();
        out.line("  ConcreteBuilder alone, only part B: " + alone.getResult().describe());
    }
}
