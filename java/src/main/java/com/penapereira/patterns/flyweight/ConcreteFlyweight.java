package com.penapereira.patterns.flyweight;

/** Stores intrinsic state; immutable, therefore sharable. */
public final class ConcreteFlyweight implements Flyweight {

    private final String intrinsicState;

    public ConcreteFlyweight(String intrinsicState) {
        this.intrinsicState = intrinsicState;
    }

    @Override
    public String operation(int extrinsicState) {
        return "ConcreteFlyweight(" + intrinsicState + ") with extrinsic state " + extrinsicState;
    }
}
