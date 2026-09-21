from typing import Protocol


class Observer(Protocol):
    """The notification interface; push model: the change is carried in the call."""

    def update(self, old_state: int, new_state: int) -> None: ...
