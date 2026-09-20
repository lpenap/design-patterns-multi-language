package com.penapereira.patterns.facade;

/** Knows which subsystem classes handle a request and drives them in order. */
public final class Facade {

    private final SubsystemA a = new SubsystemA();
    private final SubsystemB b = new SubsystemB();
    private final SubsystemC c = new SubsystemC();

    public String operation() {
        return "Facade.operation(): " + a.operationA() + ", " + b.operationB() + ", " + c.operationC();
    }
}
