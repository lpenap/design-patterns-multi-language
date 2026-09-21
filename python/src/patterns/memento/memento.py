class Memento:
    """The snapshot. ``_state`` is read only by the originator (a convention in Python)."""

    def __init__(self, state: str) -> None:
        self._state = state
