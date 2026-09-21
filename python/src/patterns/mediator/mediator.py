from __future__ import annotations

from typing import TYPE_CHECKING, Protocol

if TYPE_CHECKING:
    from .colleague import Colleague


class Mediator(Protocol):
    """Defines the interface for communicating with colleagues."""

    def notify(self, sender: Colleague, message: str) -> None: ...
