package com.penapereira.patterns.singleton;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: obtains the instance through instance() only. */
public final class SingletonExample implements Example {

    @Override
    public String id() {
        return "singleton";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Singleton Pattern Implementation");
        Singleton first = Singleton.instance();
        Singleton second = Singleton.instance();
        out.line("  Same instance returned twice: " + (first == second));
        out.line("  " + first.doSomething());
    }
}
