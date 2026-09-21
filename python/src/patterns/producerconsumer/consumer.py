from __future__ import annotations

from typing import TYPE_CHECKING

from .constants import POISON_PILL

if TYPE_CHECKING:
    from .bounded_buffer import BoundedBuffer


class Consumer:
    """Takes items until it takes the poison pill; take() waits while the buffer is empty."""

    def __init__(self, buffer: BoundedBuffer[int], consumed: list[int]) -> None:
        self._buffer = buffer
        self._consumed = consumed

    def run(self) -> None:
        while (item := self._buffer.take()) != POISON_PILL:
            self._consumed.append(item)
