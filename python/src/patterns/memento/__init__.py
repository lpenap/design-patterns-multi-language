"""Memento: capture an object's state so it can be restored, without exposing it."""

from patterns.runtime.contract import Output


class Memento:
    """The snapshot. ``_state`` is read only by the originator (a convention in Python)."""

    def __init__(self, state: str) -> None:
        self._state = state


class Originator:
    """Creates mementos of its state and restores itself from them."""

    def __init__(self) -> None:
        self._state = ""

    def set_state(self, state: str) -> None:
        self._state = state

    def get_state(self) -> str:
        return self._state

    def create_memento(self) -> Memento:
        return Memento(self._state)

    def restore(self, memento: Memento) -> None:
        self._state = memento._state  # noqa: SLF001 - the originator owns the wide interface


class Caretaker:
    """Keeps mementos safe; never examines their contents (the narrow interface)."""

    def __init__(self) -> None:
        self._history: list[Memento] = []

    def save(self, originator: Originator) -> None:
        self._history.append(originator.create_memento())

    def undo(self, originator: Originator) -> bool:
        """Restore the most recent saved state; False if nothing was saved."""
        if not self._history:
            return False
        originator.restore(self._history.pop())
        return True


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
