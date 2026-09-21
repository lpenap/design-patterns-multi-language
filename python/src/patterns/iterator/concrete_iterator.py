from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .concrete_aggregate import ConcreteAggregate


class ConcreteIterator:
    """Keeps track of the current position in the traversal."""

    def __init__(self, aggregate: ConcreteAggregate) -> None:
        self._aggregate = aggregate
        self._index = 0

    def has_next(self) -> bool:
        return self._index < self._aggregate.count()

    def next(self) -> str:
        if not self.has_next():
            raise StopIteration("no more elements")
        item = self._aggregate._get(self._index)  # noqa: SLF001 - iterator is the aggregate's friend
        self._index += 1
        return item
