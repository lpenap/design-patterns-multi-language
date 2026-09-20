import type { Example } from "../runtime/contract.ts";
import { type Command, ConcreteCommand, Invoker, Receiver } from "./command.ts";

/** The client: creates commands bound to a receiver and hands them to the invoker. */
export const commandExample: Example = {
  id: "command",
  run(out) {
    out.line("Executing Command Pattern Implementation");
    const receiver = new Receiver();
    const invoker = new Invoker();
    for (const word of ["Hello", "World"]) {
      const command: Command = new ConcreteCommand(receiver, word);
      invoker.execute(command);
      out.line(`  Executed ${command.describe()}: state = ${receiver.getState()}`);
    }
    const undone = invoker.undo();
    if (undone !== undefined) {
      out.line(`  Undone ${undone.describe()}: state = ${receiver.getState()}`);
    }
  },
};
