from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from collections.abc import Sequence

    from .bounded_buffer import BoundedBuffer


class Producer:
    """Puts its items into the buffer in order; put() waits while the buffer is full."""

    def __init__(self, buffer: BoundedBuffer[int], items: Sequence[int]) -> None:
        self._buffer = buffer
        self._items = items

    def run(self) -> None:
        for item in self._items:
            self._buffer.put(item)
