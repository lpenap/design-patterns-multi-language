"""Iterator: access an aggregate's elements sequentially without exposing its representation."""

from .aggregate import Aggregate
from .concrete_aggregate import ConcreteAggregate
from .concrete_iterator import ConcreteIterator
from .example import IteratorExample, example
from .iterator import Iterator

__all__ = [
    "Iterator",
    "Aggregate",
    "ConcreteAggregate",
    "ConcreteIterator",
    "IteratorExample",
    "example",
]
