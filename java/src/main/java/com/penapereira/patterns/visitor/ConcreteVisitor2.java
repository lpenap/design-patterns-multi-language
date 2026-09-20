package com.penapereira.patterns.visitor;

import java.util.ArrayList;
import java.util.List;

/** Concatenates what each element computes. */
public final class ConcreteVisitor2 implements Visitor {

    private final List<String> parts = new ArrayList<>();

    @Override
    public void visitConcreteElementA(ConcreteElementA element) {
        parts.add(element.operationA());
    }

    @Override
    public void visitConcreteElementB(ConcreteElementB element) {
        parts.add(element.operationB());
    }

    public String result() {
        return String.join("+", parts);
    }
}
