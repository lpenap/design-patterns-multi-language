package com.penapereira.patterns.flyweight;

/** Receives extrinsic state and acts on it together with its intrinsic state. */
public interface Flyweight {

    String operation(int extrinsicState);
}
