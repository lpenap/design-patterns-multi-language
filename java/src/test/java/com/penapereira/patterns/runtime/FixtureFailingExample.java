package com.penapereira.patterns.runtime;

public final class FixtureFailingExample implements Example {

    @Override
    public String id() {
        return "fixture-failing";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Fixture Failing Pattern Implementation");
        throw new IllegalStateException("boom");
    }
}
