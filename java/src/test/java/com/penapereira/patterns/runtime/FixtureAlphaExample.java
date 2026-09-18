package com.penapereira.patterns.runtime;

public final class FixtureAlphaExample implements Example {

    @Override
    public String id() {
        return "fixture-alpha";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Fixture Alpha Pattern Implementation");
        out.line("  first");
        out.line("  second");
    }
}
