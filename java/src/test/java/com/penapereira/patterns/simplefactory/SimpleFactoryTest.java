package com.penapereira.patterns.simplefactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class SimpleFactoryTest {

    private final SimpleFactory factory = new SimpleFactory();

    @Test
    void mapsTypeCodesToConcreteProducts() {
        assertInstanceOf(ConcreteProductA.class, factory.createProduct("A"));
        assertInstanceOf(ConcreteProductB.class, factory.createProduct("B"));
        assertEquals("ConcreteProductA", factory.createProduct("A").name());
        assertEquals("ConcreteProductB", factory.createProduct("B").name());
    }

    @Test
    void rejectsUnknownTypes() {
        IllegalArgumentException e =
                assertThrows(IllegalArgumentException.class, () -> factory.createProduct("Z"));
        assertEquals("Unknown product type: Z", e.getMessage());
    }
}
