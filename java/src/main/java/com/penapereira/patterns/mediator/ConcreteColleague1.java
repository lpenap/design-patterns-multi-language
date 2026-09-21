package com.penapereira.patterns.mediator;

/** Colleague 1; reaches its peer only through the mediator. */
public final class ConcreteColleague1 extends Colleague {

    public ConcreteColleague1(Mediator mediator) {
        super(mediator);
    }

    @Override
    public String name() {
        return "ConcreteColleague1";
    }
}
