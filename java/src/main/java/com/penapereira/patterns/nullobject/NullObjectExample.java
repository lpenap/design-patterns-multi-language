package com.penapereira.patterns.nullobject;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;
import java.util.List;

/** Runs the same client once with a real logger and once with the null logger. */
public final class NullObjectExample implements Example {

    @Override
    public String id() {
        return "null-object";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Null Object Pattern Implementation");
        List<String> orders = List.of("order 1", "order 2");
        out.line("  OrderProcessor with OutputLogger:");
        out.line("    processed " + new OrderProcessor(new OutputLogger(out)).process(orders) + " orders");
        out.line("  OrderProcessor with NullLogger:");
        out.line("    processed " + new OrderProcessor(new NullLogger()).process(orders) + " orders");
        out.line("  The processor never tested its logger for null");
    }
}
