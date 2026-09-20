package com.penapereira.patterns.mediator;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: wires colleagues to the mediator and triggers messages. */
public final class MediatorExample implements Example {

    @Override
    public String id() {
        return "mediator";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Mediator Pattern Implementation");
        ConcreteMediator mediator = new ConcreteMediator();
        Colleague one = new ConcreteColleague1(mediator);
        Colleague two = new ConcreteColleague2(mediator);
        mediator.setColleague1(one);
        mediator.setColleague2(two);
        exchange(one, two, "hello", out);
        exchange(two, one, "hi", out);
    }

    private static void exchange(Colleague sender, Colleague receiver, String message, Output out) {
        sender.send(message);
        out.line("  " + sender.name() + " sends: " + message);
        out.line("  " + receiver.name() + " receives: " + receiver.received().getLast());
    }
}
