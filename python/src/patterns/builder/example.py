from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_builder import ConcreteBuilder
from .director import Director

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .builder import Builder


class BuilderExample:
    """The client: hands a builder to the director, then uses a builder directly."""

    id = "builder"

    def run(self, out: Output) -> None:
        out.line("Executing Builder Pattern Implementation")
        built = Director().construct(ConcreteBuilder())
        out.line(f"  Director.construct(ConcreteBuilder): {built.describe()}")
        alone: Builder = ConcreteBuilder()
        alone.build_part_b()
        out.line(f"  ConcreteBuilder alone, only part B: {alone.get_result().describe()}")


example = BuilderExample()
