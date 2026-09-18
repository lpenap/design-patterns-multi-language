package com.penapereira.patterns.runtime;

public final class FixtureBetaExample implements Example {

    @Override
    public String id() {
        return "fixture-beta";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Fixture Beta Pattern Implementation");
    }
}
