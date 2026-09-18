package com.penapereira.patterns.strategy;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class StrategyTest {

    @Test
    void operationDelegatesToTheConfiguredStrategy() {
        assertEquals("Operation with --> algorithm from ConcreteStrategyA",
                new Context(new ConcreteStrategyA()).operation());
        assertEquals("Operation with ==> algorithm from ConcreteStrategyB",
                new Context(new ConcreteStrategyB()).operation());
    }

    @Test
    void switchingTheStrategyChangesTheNextOperation() {
        Context context = new Context(new ConcreteStrategyA());
        context.setStrategy(new ConcreteStrategyB());
        assertEquals("Operation with ==> algorithm from ConcreteStrategyB", context.operation());
    }

    @Test
    void aLambdaIsAValidStrategy() {
        assertEquals("Operation with lambda", new Context(() -> "lambda").operation());
    }
}
