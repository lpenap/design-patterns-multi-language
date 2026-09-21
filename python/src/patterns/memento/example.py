from typing import TYPE_CHECKING

from .caretaker import Caretaker
from .originator import Originator

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


class MementoExample:
    """The client: drives changes and asks the caretaker to save and undo."""

    id = "memento"

    def run(self, out: Output) -> None:
        out.line("Executing Memento Pattern Implementation")
        originator = Originator()
        caretaker = Caretaker()
        for state in ("A", "B"):
            originator.set_state(state)
            caretaker.save(originator)
            out.line(f"  Originator state: {originator.get_state()} (saved)")
        originator.set_state("C")
        out.line(f"  Originator state: {originator.get_state()}")
        while caretaker.undo(originator):
            out.line(f"  Restored: {originator.get_state()}")


example = MementoExample()
