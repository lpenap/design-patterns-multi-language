from .subject import Subject


class ConcreteSubject(Subject):
    """Holds the state of interest and notifies when it changes."""

    def __init__(self) -> None:
        super().__init__()
        self._state = 0

    def get_state(self) -> int:
        return self._state

    def set_state(self, new_state: int) -> None:
        if new_state == self._state:
            return
        old_state = self._state
        self._state = new_state
        self.notify_observers(old_state, new_state)
