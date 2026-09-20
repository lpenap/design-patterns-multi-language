from __future__ import annotations

from typing import Protocol


class Prototype(Protocol):
    """Declares the interface for cloning itself."""

    def clone(self) -> Prototype: ...

    def describe(self) -> str: ...
