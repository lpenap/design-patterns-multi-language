from typing import TYPE_CHECKING

from .concrete_aggregate import ConcreteAggregate

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


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
