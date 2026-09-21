package com.penapereira.patterns.strategy;

/** Algorithm B, interchangeable with any other strategy. */
public final class ConcreteStrategyB implements Strategy {

    @Override
    public String executeAlgorithm() {
        return "==> algorithm from ConcreteStrategyB";
    }
}
