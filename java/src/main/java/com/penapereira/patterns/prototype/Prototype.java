package com.penapereira.patterns.prototype;

/** Declares the interface for cloning itself. */
public interface Prototype {

    Prototype clone();

    String describe();
}
