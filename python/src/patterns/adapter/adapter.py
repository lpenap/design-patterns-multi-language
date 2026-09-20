from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .adaptee import Adaptee


class Adapter:
    """Implements Target by delegating to the Adaptee it holds."""

    def __init__(self, adaptee: Adaptee) -> None:
        self._adaptee = adaptee

    def request(self) -> str:
        return f"Adapter({self._adaptee.specific_request()})"
