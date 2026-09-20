from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_creator_a import ConcreteCreatorA
from .concrete_creator_b import ConcreteCreatorB

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .creator import Creator


class FactoryMethodExample:
    """The client: uses creators through the Creator type only."""

    id = "factory-method"

    def run(self, out: Output) -> None:
        out.line("Executing Factory Method Pattern Implementation")
        creators: list[Creator] = [ConcreteCreatorA(), ConcreteCreatorB()]
        for creator in creators:
            out.line(f"  {creator.an_operation()}")


example = FactoryMethodExample()
