from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_flyweight import ConcreteFlyweight

if TYPE_CHECKING:
    from .flyweight import Flyweight


class FlyweightFactory:
    """Creates flyweights on first request and returns the existing one afterwards."""

    def __init__(self) -> None:
        self._pool: dict[str, Flyweight] = {}

    def get_flyweight(self, key: str) -> Flyweight:
        if key not in self._pool:
            self._pool[key] = ConcreteFlyweight(key)
        return self._pool[key]

    def count(self) -> int:
        return len(self._pool)
