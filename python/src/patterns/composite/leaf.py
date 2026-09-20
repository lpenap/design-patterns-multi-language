from __future__ import annotations


class Leaf:
    """A primitive with no children."""

    def __init__(self, name: str) -> None:
        self._name = name

    def operation(self) -> str:
        return f"Leaf({self._name})"
