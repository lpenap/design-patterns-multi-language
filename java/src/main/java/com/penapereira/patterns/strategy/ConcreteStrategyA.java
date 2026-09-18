package com.penapereira.patterns.strategy;

public final class ConcreteStrategyA implements Strategy {

    @Override
    public String executeAlgorithm() {
        return "--> algorithm from ConcreteStrategyA";
    }
}
