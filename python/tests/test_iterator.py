import pytest

from patterns.iterator import ConcreteAggregate


def abc() -> ConcreteAggregate:
    aggregate = ConcreteAggregate()
    for item in ("a", "b", "c"):
        aggregate.add(item)
    return aggregate


def test_traverses_in_order_and_stops_at_the_end() -> None:
    it = abc().create_iterator()
    assert it.has_next()
    assert [it.next(), it.next(), it.next()] == ["a", "b", "c"]
    assert not it.has_next()
    with pytest.raises(StopIteration):
        it.next()


def test_iterators_over_one_aggregate_are_independent() -> None:
    aggregate = abc()
    first = aggregate.create_iterator()
    second = aggregate.create_iterator()
    first.next()
    first.next()
    assert first.next() == "c"
    assert second.next() == "a"


def test_an_empty_aggregate_has_nothing_to_visit() -> None:
    empty = ConcreteAggregate()
    assert empty.count() == 0
    assert not empty.create_iterator().has_next()
