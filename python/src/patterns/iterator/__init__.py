"""Iterator: access an aggregate's elements sequentially without exposing its representation."""

from typing import Protocol

from patterns.runtime.contract import Output


class Iterator(Protocol):
    """The interface for accessing and traversing elements."""

    def has_next(self) -> bool: ...

    def next(self) -> str: ...


class Aggregate(Protocol):
    """The interface for creating an Iterator object."""

    def create_iterator(self) -> Iterator: ...


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


class IteratorExample:
    """The client: traverses through the Iterator interface only."""

    id = "iterator"

    def run(self, out: Output) -> None:
        out.line("Executing Iterator Pattern Implementation")
        aggregate = ConcreteAggregate()
        for item in ("a", "b", "c"):
            aggregate.add(item)
        visited: list[str] = []
        iterator = aggregate.create_iterator()
        while iterator.has_next():
            visited.append(iterator.next())
        out.line(f"  ConcreteIterator traversal: {' '.join(visited)}")
        first = aggregate.create_iterator()
        second = aggregate.create_iterator()
        out.line(
            f"  Two iterators are independent: first.next()={first.next()}, "
            f"second.next()={second.next()}"
        )


example = IteratorExample()
