package com.penapereira.patterns.templatemethod;

/** Fixes the algorithm's skeleton; subclasses supply the steps. */
public abstract class AbstractClass {

    /** The skeleton: final so subclasses vary the steps, never the order. */
    public final String templateMethod() {
        return primitiveOperation1() + " then " + primitiveOperation2() + hook();
    }

    protected abstract String primitiveOperation1();

    protected abstract String primitiveOperation2();

    /** A hook: default behaviour that subclasses may extend. */
    protected String hook() {
        return "";
    }
}
