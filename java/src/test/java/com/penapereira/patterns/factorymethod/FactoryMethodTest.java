package com.penapereira.patterns.factorymethod;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class FactoryMethodTest {

    @Test
    void eachConcreteCreatorBuildsItsOwnProduct() {
        assertEquals("Built ConcreteProductA", new ConcreteCreatorA().anOperation());
        assertEquals("Built ConcreteProductB", new ConcreteCreatorB().anOperation());
    }

    @Test
    void templateOperationUsesWhateverTheSubclassReturns() {
        Creator custom = new Creator() {
            @Override
            protected Product factoryMethod() {
                return () -> "Custom";
            }
        };
        assertEquals("Built Custom", custom.anOperation());
    }
}
