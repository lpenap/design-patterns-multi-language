package com.penapereira.patterns.observer;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: wires subject and observers and drives the changes. */
public final class ObserverExample implements Example {

    @Override
    public String id() {
        return "observer";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Observer Pattern Implementation");
        ConcreteSubject subject = new ConcreteSubject();
        Observer observer1 = new ConcreteObserver("observer1", text -> out.line("  " + text));
        Observer observer2 = new ConcreteObserver("observer2", text -> out.line("  " + text));
        subject.attach(observer1);
        subject.attach(observer2);
        subject.setState(5);
        subject.detach(observer2);
        subject.setState(10);
    }
}
