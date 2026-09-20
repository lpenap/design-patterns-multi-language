package com.penapereira.patterns.memento;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class MementoTest {

    @Test
    void savedStatesAreRestoredMostRecentFirst() {
        Originator originator = new Originator();
        Caretaker caretaker = new Caretaker();
        originator.setState("one");
        caretaker.save(originator);
        originator.setState("two");
        caretaker.save(originator);
        originator.setState("three");
        assertTrue(caretaker.undo(originator));
        assertEquals("two", originator.getState());
        assertTrue(caretaker.undo(originator));
        assertEquals("one", originator.getState());
    }

    @Test
    void undoWithNothingSavedLeavesTheOriginatorAlone() {
        Originator originator = new Originator();
        originator.setState("x");
        assertFalse(new Caretaker().undo(originator));
        assertEquals("x", originator.getState());
    }

    @Test
    void aMementoCapturesTheValueAtSaveTime() {
        Originator originator = new Originator();
        originator.setState("before");
        Originator.Memento memento = originator.createMemento();
        originator.setState("after");
        originator.restore(memento);
        assertEquals("before", originator.getState());
    }
}
