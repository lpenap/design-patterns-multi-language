from .memento import Memento


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
