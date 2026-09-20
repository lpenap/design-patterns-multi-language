package com.penapereira.patterns.mediator;

public final class ConcreteColleague2 extends Colleague {

    public ConcreteColleague2(Mediator mediator) {
        super(mediator);
    }

    @Override
    public String name() {
        return "ConcreteColleague2";
    }
}
