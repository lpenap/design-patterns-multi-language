from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .context import Context


class NumberExpression:
    """Terminal: a literal number."""

    def __init__(self, value: int) -> None:
        self._value = value

    def interpret(self, context: Context) -> int:
        return self._value

    def describe(self) -> str:
        return str(self._value)
