package com.penapereira.patterns.builder;

/** Owns the sequence of construction steps; knows nothing of the representation. */
public final class Director {

    public Product construct(Builder builder) {
        builder.buildPartA();
        builder.buildPartB();
        return builder.getResult();
    }
}
