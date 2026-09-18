package com.penapereira.patterns.simplefactory;

/** Maps a type code to a concrete product; the single place where products are created. */
public final class SimpleFactory {

    public Product createProduct(String type) {
        return switch (type) {
            case "A" -> new ConcreteProductA();
            case "B" -> new ConcreteProductB();
            default -> throw new IllegalArgumentException("Unknown product type: " + type);
        };
    }
}
