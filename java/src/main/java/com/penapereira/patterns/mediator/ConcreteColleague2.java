package com.penapereira.patterns.mediator;

/** Colleague 2; reaches its peer only through the mediator. */
public final class ConcreteColleague2 extends Colleague {

    public ConcreteColleague2(Mediator mediator) {
        super(mediator);
    }

    @Override
    public String name() {
        return "ConcreteColleague2";
    }
}
