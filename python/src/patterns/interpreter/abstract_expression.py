from __future__ import annotations

from typing import TYPE_CHECKING, Protocol

if TYPE_CHECKING:
    from .context import Context


class AbstractExpression(Protocol):
    """A node of the abstract syntax tree."""

    def interpret(self, context: Context) -> int: ...

    def describe(self) -> str: ...
