package com.penapereira.patterns.visitor;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: creates visitors and applies them to the structure. */
public final class VisitorExample implements Example {

    @Override
    public String id() {
        return "visitor";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Visitor Pattern Implementation");
        ObjectStructure structure = new ObjectStructure();
        structure.add(new ConcreteElementA());
        structure.add(new ConcreteElementB());
        ConcreteVisitor1 first = new ConcreteVisitor1();
        structure.accept(first);
        out.line("  ConcreteVisitor1: " + first.result());
        ConcreteVisitor2 second = new ConcreteVisitor2();
        structure.accept(second);
        out.line("  ConcreteVisitor2: " + second.result());
    }
}
