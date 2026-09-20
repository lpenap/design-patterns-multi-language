from __future__ import annotations

import copy


class ConcretePrototype1:
    """Copies its own state through copy.copy."""

    def __init__(self, state: str) -> None:
        self._state = state

    def clone(self) -> ConcretePrototype1:
        return copy.copy(self)

    def set_state(self, state: str) -> None:
        self._state = state

    def describe(self) -> str:
        return f"ConcretePrototype1(state={self._state})"
