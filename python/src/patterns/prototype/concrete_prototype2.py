from __future__ import annotations

import copy


class ConcretePrototype2:
    def __init__(self, state: str) -> None:
        self._state = state

    def clone(self) -> ConcretePrototype2:
        return copy.copy(self)

    def set_state(self, state: str) -> None:
        self._state = state

    def describe(self) -> str:
        return f"ConcretePrototype2(state={self._state})"
