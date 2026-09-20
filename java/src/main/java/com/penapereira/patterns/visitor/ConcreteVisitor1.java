package com.penapereira.patterns.visitor;

import java.util.ArrayList;
import java.util.List;

/** Records which element classes it visited. */
public final class ConcreteVisitor1 implements Visitor {

    private final List<String> visited = new ArrayList<>();

    @Override
    public void visitConcreteElementA(ConcreteElementA element) {
        visited.add("visited ConcreteElementA");
    }

    @Override
    public void visitConcreteElementB(ConcreteElementB element) {
        visited.add("visited ConcreteElementB");
    }

    public String result() {
        return String.join(", ", visited);
    }
}
