package com.penapereira.patterns.composite;

/** A primitive with no children. */
public final class Leaf implements Component {

    private final String name;

    public Leaf(String name) {
        this.name = name;
    }

    @Override
    public String operation() {
        return "Leaf(" + name + ")";
    }
}
