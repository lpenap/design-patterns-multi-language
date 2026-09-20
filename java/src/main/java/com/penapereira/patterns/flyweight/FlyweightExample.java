package com.penapereira.patterns.flyweight;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: keeps the extrinsic state and obtains flyweights from the factory only. */
public final class FlyweightExample implements Example {

    @Override
    public String id() {
        return "flyweight";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Flyweight Pattern Implementation");
        FlyweightFactory factory = new FlyweightFactory();
        String[] keys = {"a", "b", "a"};
        for (int i = 0; i < keys.length; i++) {
            out.line("  " + factory.getFlyweight(keys[i]).operation(i + 1));
        }
        out.line("  Flyweights created: " + factory.count() + " for " + keys.length + " requests");
    }
}
