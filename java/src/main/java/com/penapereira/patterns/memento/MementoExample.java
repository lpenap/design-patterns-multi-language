package com.penapereira.patterns.memento;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: drives changes and asks the caretaker to save and undo. */
public final class MementoExample implements Example {

    @Override
    public String id() {
        return "memento";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Memento Pattern Implementation");
        Originator originator = new Originator();
        Caretaker caretaker = new Caretaker();
        originator.setState("A");
        caretaker.save(originator);
        out.line("  Originator state: " + originator.getState() + " (saved)");
        originator.setState("B");
        caretaker.save(originator);
        out.line("  Originator state: " + originator.getState() + " (saved)");
        originator.setState("C");
        out.line("  Originator state: " + originator.getState());
        while (caretaker.undo(originator)) {
            out.line("  Restored: " + originator.getState());
        }
    }
}
