"""Flyweight: share fine-grained objects; keep the varying state outside them."""

from typing import Protocol

from patterns.runtime.contract import Output


class Flyweight(Protocol):
    """Receives extrinsic state and acts on it together with its intrinsic state."""

    def operation(self, extrinsic_state: int) -> str: ...


class ConcreteFlyweight:
    """Stores intrinsic state; immutable, therefore sharable."""

    def __init__(self, intrinsic_state: str) -> None:
        self._intrinsic_state = intrinsic_state

    def operation(self, extrinsic_state: int) -> str:
        return f"ConcreteFlyweight({self._intrinsic_state}) with extrinsic state {extrinsic_state}"


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


class FlyweightExample:
    """The client: keeps the extrinsic state and obtains flyweights from the factory only."""

    id = "flyweight"

    def run(self, out: Output) -> None:
        out.line("Executing Flyweight Pattern Implementation")
        factory = FlyweightFactory()
        keys = ["a", "b", "a"]
        for extrinsic_state, key in enumerate(keys, start=1):
            out.line(f"  {factory.get_flyweight(key).operation(extrinsic_state)}")
        out.line(f"  Flyweights created: {factory.count()} for {len(keys)} requests")


example = FlyweightExample()
