package com.penapereira.patterns.mediator;

public final class ConcreteColleague1 extends Colleague {

    public ConcreteColleague1(Mediator mediator) {
        super(mediator);
    }

    @Override
    public String name() {
        return "ConcreteColleague1";
    }
}
