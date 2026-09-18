package com.penapereira.patterns.abstractfactory;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: uses only the abstract factory and abstract product types. */
public final class AbstractFactoryExample implements Example {

    @Override
    public String id() {
        return "abstract-factory";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Abstract Factory Pattern Implementation");
        useFamily(new ConcreteFactory1(), out);
        useFamily(new ConcreteFactory2(), out);
    }

    private static void useFamily(AbstractFactory factory, Output out) {
        out.line("  " + factory.createProductA().name());
        out.line("  " + factory.createProductB().name());
    }
}
