from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .implementor import Implementor


class Abstraction:
    """Holds the implementor and forwards the primitive operation to it."""

    def __init__(self, implementor: Implementor) -> None:
        self._implementor = implementor

    def operation(self) -> str:
        return f"Abstraction({self._implementor.operation_impl()})"
