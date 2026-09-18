package com.penapereira.patterns.decorator;

/** The object being decorated. */
public final class ConcreteComponent implements Component {

    @Override
    public String operation() {
        return "ConcreteComponent";
    }
}
