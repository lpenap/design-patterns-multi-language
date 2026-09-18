package com.penapereira.patterns.strategy;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: chooses the strategies and hands them to the context. */
public final class StrategyExample implements Example {

    @Override
    public String id() {
        return "strategy";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Strategy Pattern Implementation");
        Context context = new Context(new ConcreteStrategyA());
        out.line("  " + context.operation());
        context.setStrategy(new ConcreteStrategyB());
        out.line("  " + context.operation());
    }
}
