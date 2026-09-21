from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_iterator import ConcreteIterator

if TYPE_CHECKING:
    from .iterator import Iterator


class ConcreteAggregate:
    """Holds the items and hands out iterators over them."""

    def __init__(self) -> None:
        self._items: list[str] = []

    def add(self, item: str) -> None:
        self._items.append(item)

    def count(self) -> int:
        return len(self._items)

    def _get(self, index: int) -> str:
        """Access for the iterator; the list itself is never exposed."""
        return self._items[index]

    def create_iterator(self) -> Iterator:
        return ConcreteIterator(self)
