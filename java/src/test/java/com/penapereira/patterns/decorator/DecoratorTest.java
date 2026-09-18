package com.penapereira.patterns.decorator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotSame;

import org.junit.jupiter.api.Test;

class DecoratorTest {

    @Test
    void addsBehaviourAroundTheComponent() {
        assertEquals("ConcreteDecoratorA(ConcreteComponent)",
                new ConcreteDecoratorA(new ConcreteComponent()).operation());
    }

    @Test
    void nestsInAnyOrderAndCanBeAppliedTwice() {
        Component c = new ConcreteComponent();
        assertEquals("ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))",
                new ConcreteDecoratorB(new ConcreteDecoratorA(c)).operation());
        assertEquals("ConcreteDecoratorA(ConcreteDecoratorB(ConcreteComponent))",
                new ConcreteDecoratorA(new ConcreteDecoratorB(c)).operation());
        assertEquals("ConcreteDecoratorA(ConcreteDecoratorA(ConcreteComponent))",
                new ConcreteDecoratorA(new ConcreteDecoratorA(c)).operation());
    }

    @Test
    void aDecoratorIsNotItsComponent() {
        Component c = new ConcreteComponent();
        assertNotSame(c, new ConcreteDecoratorA(c));
    }
}
