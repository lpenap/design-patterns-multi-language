package com.penapereira.patterns.mediator;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class MediatorTest {

    @Test
    void routesMessagesToTheOtherColleagueInBothDirections() {
        ConcreteMediator mediator = new ConcreteMediator();
        Colleague one = new ConcreteColleague1(mediator);
        Colleague two = new ConcreteColleague2(mediator);
        mediator.setColleague1(one);
        mediator.setColleague2(two);
        one.send("a");
        one.send("b");
        two.send("c");
        assertEquals(List.of("a", "b"), two.received());
        assertEquals(List.of("c"), one.received());
    }

    @Test
    void colleaguesTalkOnlyToTheMediator() {
        List<String> seen = new ArrayList<>();
        Mediator recording = (sender, message) -> seen.add(sender.name() + ":" + message);
        Colleague one = new ConcreteColleague1(recording);
        Colleague two = new ConcreteColleague2(recording);
        one.send("x");
        two.send("y");
        assertEquals(List.of("ConcreteColleague1:x", "ConcreteColleague2:y"), seen);
        assertEquals(List.of(), one.received());
        assertEquals(List.of(), two.received());
    }
}
