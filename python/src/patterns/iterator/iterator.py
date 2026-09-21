from typing import Protocol


class Iterator(Protocol):
    """The interface for accessing and traversing elements."""

    def has_next(self) -> bool: ...

    def next(self) -> str: ...
