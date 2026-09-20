package com.penapereira.patterns.builder;

/** The abstract interface for creating parts of a product. */
public interface Builder {

    void buildPartA();

    void buildPartB();

    Product getResult();
}
