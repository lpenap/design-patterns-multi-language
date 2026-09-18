package com.penapereira.patterns.templatemethod;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: calls the template method through the abstract type. */
public final class TemplateMethodExample implements Example {

    @Override
    public String id() {
        return "template-method";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Template Method Pattern Implementation");
        for (AbstractClass instance : new AbstractClass[] {new ConcreteClassA(), new ConcreteClassB()}) {
            out.line("  " + instance.templateMethod());
        }
    }
}
