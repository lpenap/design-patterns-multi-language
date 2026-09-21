from __future__ import annotations

from typing import TYPE_CHECKING, Protocol

if TYPE_CHECKING:
    from .context import Context


class State(Protocol):
    """The interface for behaviour associated with one state of the Context."""

    def handle(self, context: Context) -> None: ...

    def name(self) -> str: ...
