from __future__ import annotations

from typing import TYPE_CHECKING, Protocol

if TYPE_CHECKING:
    from .iterator import Iterator


class Aggregate(Protocol):
    """The interface for creating an Iterator object."""

    def create_iterator(self) -> Iterator: ...
