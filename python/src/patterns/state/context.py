from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .state import State


class Context:
    """Holds the current state and delegates state-specific requests to it."""

    def __init__(self, initial: State) -> None:
        self._state = initial

    def request(self) -> str:
        before = self._state.name()
        self._state.handle(self)
        return f"request() handled by {before}, now in {self._state.name()}"

    def set_state(self, state: State) -> None:
        self._state = state

    def get_state_name(self) -> str:
        return self._state.name()
