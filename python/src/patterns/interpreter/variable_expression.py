from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .context import Context


class VariableExpression:
    """Terminal: a variable looked up in the context."""

    def __init__(self, name: str) -> None:
        self._name = name

    def interpret(self, context: Context) -> int:
        return context.lookup(self._name)

    def describe(self) -> str:
        return self._name
