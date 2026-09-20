from __future__ import annotations

from typing import Protocol


class Component(Protocol):
    """The interface for objects in the composition."""

    def operation(self) -> str: ...
