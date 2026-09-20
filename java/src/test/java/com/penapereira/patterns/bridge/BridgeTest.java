package com.penapereira.patterns.bridge;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class BridgeTest {

    @Test
    void anyAbstractionWorksWithAnyImplementor() {
        assertEquals("Abstraction(ConcreteImplementorA)", new Abstraction(new ConcreteImplementorA()).operation());
        assertEquals("Abstraction(ConcreteImplementorB)", new Abstraction(new ConcreteImplementorB()).operation());
        assertEquals("RefinedAbstraction(ConcreteImplementorA)",
                new RefinedAbstraction(new ConcreteImplementorA()).operation());
        assertEquals("RefinedAbstraction(ConcreteImplementorB)",
                new RefinedAbstraction(new ConcreteImplementorB()).operation());
    }

    @Test
    void aNewImplementorNeedsNoChangeOnTheAbstractionSide() {
        Implementor custom = () -> "Custom";
        assertEquals("Abstraction(Custom)", new Abstraction(custom).operation());
        assertEquals("RefinedAbstraction(Custom)", new RefinedAbstraction(custom).operation());
    }
}
