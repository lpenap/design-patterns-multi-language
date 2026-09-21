from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .abstract_expression import AbstractExpression
    from .context import Context


class SubtractExpression:
    """Nonterminal: expression '-' expression."""

    def __init__(self, left: AbstractExpression, right: AbstractExpression) -> None:
        self._left, self._right = left, right

    def interpret(self, context: Context) -> int:
        return self._left.interpret(context) - self._right.interpret(context)

    def describe(self) -> str:
        return f"({self._left.describe()} - {self._right.describe()})"
