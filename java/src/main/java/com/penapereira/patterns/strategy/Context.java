package com.penapereira.patterns.strategy;

/** Holds a strategy and delegates to it; the strategy can be replaced at run time. */
public final class Context {

    private Strategy strategy;

    public Context(Strategy strategy) {
        this.strategy = strategy;
    }

    public String operation() {
        return "Operation with " + strategy.executeAlgorithm();
    }

    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }
}
