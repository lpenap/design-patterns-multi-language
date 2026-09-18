package com.penapereira.patterns.chainofresponsibility;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: assembles the chain and sends requests to its first link. */
public final class ChainOfResponsibilityExample implements Example {

    @Override
    public String id() {
        return "chain-of-responsibility";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Chain of Responsibility Pattern Implementation");
        Handler chain = new NegativeHandler();
        chain.setNext(new ZeroHandler()).setNext(new PositiveHandler());
        for (int request : new int[] {-1, 0, 1}) {
            out.line("  " + request + " is " + chain.handle(request));
        }
    }
}
