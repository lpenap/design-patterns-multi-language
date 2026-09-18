package com.penapereira.patterns.simplefactory;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: requests products by type code and uses them through Product. */
public final class SimpleFactoryExample implements Example {

    @Override
    public String id() {
        return "simple-factory";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Simple Factory Pattern Implementation");
        SimpleFactory factory = new SimpleFactory();
        Product a = factory.createProduct("A");
        Product b = factory.createProduct("B");
        out.line("  " + a.name());
        out.line("  " + b.name());
    }
}
