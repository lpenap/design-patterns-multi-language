import { Caretaker } from "./caretaker.js";
import { Originator } from "./originator.js";

/** The client: drives changes and asks the caretaker to save and undo. */
export const mementoExample = {
  id: "memento",
  run(out) {
    out.line("Executing Memento Pattern Implementation");
    const originator = new Originator();
    const caretaker = new Caretaker();
    for (const state of ["A", "B"]) {
      originator.setState(state);
      caretaker.save(originator);
      out.line(`  Originator state: ${originator.getState()} (saved)`);
    }
    originator.setState("C");
    out.line(`  Originator state: ${originator.getState()}`);
    while (caretaker.undo(originator)) {
      out.line(`  Restored: ${originator.getState()}`);
    }
  },
};
