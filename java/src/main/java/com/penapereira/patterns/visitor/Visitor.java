package com.penapereira.patterns.visitor;

/** One visit operation per concrete element class. */
public interface Visitor {

    void visitConcreteElementA(ConcreteElementA element);

    void visitConcreteElementB(ConcreteElementB element);
}
