package com.penapereira.patterns.command;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class CommandTest {

    @Test
    void executeAndUndoActOnTheReceiver() {
        Receiver receiver = new Receiver();
        Command command = new ConcreteCommand(receiver, "x");
        command.execute();
        assertEquals("x", receiver.getState());
        command.undo();
        assertEquals("", receiver.getState());
        command.undo(); // nothing left to reverse; harmless
        assertEquals("", receiver.getState());
        assertEquals("ConcreteCommand(x)", command.describe());
    }

    @Test
    void theInvokerUndoesMostRecentFirst() {
        Receiver receiver = new Receiver();
        Invoker invoker = new Invoker();
        invoker.execute(new ConcreteCommand(receiver, "a"));
        invoker.execute(new ConcreteCommand(receiver, "b"));
        assertEquals("ConcreteCommand(b)", invoker.undo().orElseThrow().describe());
        assertEquals("a", receiver.getState());
        assertEquals("ConcreteCommand(a)", invoker.undo().orElseThrow().describe());
        assertEquals("", receiver.getState());
    }

    @Test
    void undoWithAnEmptyHistoryDoesNothing() {
        assertTrue(new Invoker().undo().isEmpty());
    }

    @Test
    void anyCommandWorksWithTheInvoker() {
        List<String> log = new ArrayList<>();
        Command custom = new Command() {
            @Override
            public void execute() {
                log.add("do");
            }

            @Override
            public void undo() {
                log.add("undo");
            }

            @Override
            public String describe() {
                return "custom";
            }
        };
        Invoker invoker = new Invoker();
        invoker.execute(custom);
        invoker.undo();
        assertEquals(List.of("do", "undo"), log);
    }
}
