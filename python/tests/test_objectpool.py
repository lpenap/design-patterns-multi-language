import pytest

from patterns.objectpool import ObjectPool


def test_creates_objects_lazily_up_to_capacity() -> None:
    pool = ObjectPool(2)
    assert pool.created == 0
    first = pool.acquire("a")
    second = pool.acquire("b")
    assert first is not second
    assert (first.id, second.id) == (1, 2)
    assert (pool.created, pool.in_use, pool.available) == (2, 2, 0)


def test_refuses_when_exhausted() -> None:
    pool = ObjectPool(1)
    pool.acquire("a")
    with pytest.raises(RuntimeError, match=r"^pool exhausted, 1 of 1 in use$"):
        pool.acquire("b")


def test_reuses_released_objects_in_fifo_order() -> None:
    pool = ObjectPool(3)
    first = pool.acquire("a")
    second = pool.acquire("b")
    pool.release(second)
    pool.release(first)
    assert pool.acquire("c") is second
    assert pool.acquire("d") is first
    assert pool.created == 2
    assert first.uses == 2


def test_release_resets_the_object() -> None:
    pool = ObjectPool(1)
    reusable = pool.acquire("a")
    assert reusable.task == "a"
    pool.release(reusable)
    assert reusable.task is None
    assert (pool.available, pool.in_use) == (1, 0)


def test_rejects_releasing_an_object_that_is_not_in_use() -> None:
    pool = ObjectPool(1)
    reusable = pool.acquire("a")
    pool.release(reusable)
    with pytest.raises(ValueError, match=r"^Reusable#1 is not in use$"):
        pool.release(reusable)


def test_rejects_a_non_positive_capacity() -> None:
    with pytest.raises(ValueError):
        ObjectPool(0)


def test_capacity_is_reported() -> None:
    assert ObjectPool(4).capacity == 4
