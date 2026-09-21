package com.penapereira.patterns.strategy;

/** Algorithm A, interchangeable with any other strategy. */
public final class ConcreteStrategyA implements Strategy {

    @Override
    public String executeAlgorithm() {
        return "--> algorithm from ConcreteStrategyA";
    }
}
