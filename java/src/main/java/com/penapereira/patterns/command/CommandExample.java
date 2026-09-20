package com.penapereira.patterns.command;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: creates commands bound to a receiver and hands them to the invoker. */
public final class CommandExample implements Example {

    @Override
    public String id() {
        return "command";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Command Pattern Implementation");
        Receiver receiver = new Receiver();
        Invoker invoker = new Invoker();
        for (String word : new String[] {"Hello", "World"}) {
            Command command = new ConcreteCommand(receiver, word);
            invoker.execute(command);
            out.line("  Executed " + command.describe() + ": state = " + receiver.getState());
        }
        invoker.undo().ifPresent(undone ->
                out.line("  Undone " + undone.describe() + ": state = " + receiver.getState()));
    }
}
