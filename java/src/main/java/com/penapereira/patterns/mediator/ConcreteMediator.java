package com.penapereira.patterns.mediator;

/** Knows its colleagues and implements the cooperative behaviour: route to the other one. */
public final class ConcreteMediator implements Mediator {

    private Colleague colleague1;
    private Colleague colleague2;

    public void setColleague1(Colleague colleague) {
        this.colleague1 = colleague;
    }

    public void setColleague2(Colleague colleague) {
        this.colleague2 = colleague;
    }

    @Override
    public void notify(Colleague sender, String message) {
        Colleague target = sender == colleague1 ? colleague2 : colleague1;
        target.receive(message);
    }
}
