package com.penapereira.patterns.observer;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class ObserverTest {

    private final List<String> reports = new ArrayList<>();
    private final ConcreteSubject subject = new ConcreteSubject();

    @Test
    void notifiesEveryObserverInAttachmentOrder() {
        subject.attach(new ConcreteObserver("a", reports::add));
        subject.attach(new ConcreteObserver("b", reports::add));
        subject.setState(1);
        assertEquals(List.of("a notified: state 0 -> 1", "b notified: state 0 -> 1"), reports);
        assertEquals(1, subject.getState());
    }

    @Test
    void aDetachedObserverHearsNothingFurther() {
        Observer a = new ConcreteObserver("a", reports::add);
        subject.attach(a);
        subject.setState(1);
        subject.detach(a);
        subject.setState(2);
        assertEquals(List.of("a notified: state 0 -> 1"), reports);
    }

    @Test
    void anUnchangedStateNotifiesNobody() {
        subject.attach(new ConcreteObserver("a", reports::add));
        subject.setState(0);
        assertEquals(List.of(), reports);
    }

    @Test
    void aLambdaCanObserve() {
        subject.attach((oldState, newState) -> reports.add(oldState + "->" + newState));
        subject.setState(3);
        assertEquals(List.of("0->3"), reports);
    }
}
