package com.penapereira.patterns.bridge;

/** Extends the abstraction's behaviour without knowing the concrete implementor. */
public final class RefinedAbstraction extends Abstraction {

    public RefinedAbstraction(Implementor implementor) {
        super(implementor);
    }

    @Override
    public String operation() {
        return "RefinedAbstraction(" + implementor.operationImpl() + ")";
    }
}
