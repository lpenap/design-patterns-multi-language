from __future__ import annotations

from typing import TYPE_CHECKING

from .abstraction import Abstraction
from .concrete_implementor_a import ConcreteImplementorA
from .concrete_implementor_b import ConcreteImplementorB
from .refined_abstraction import RefinedAbstraction

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .implementor import Implementor


class BridgeExample:
    """The client: combines each abstraction with each implementor."""

    id = "bridge"

    def run(self, out: Output) -> None:
        out.line("Executing Bridge Pattern Implementation")
        implementors: list[Implementor] = [ConcreteImplementorA(), ConcreteImplementorB()]
        for implementor in implementors:
            out.line(f"  {Abstraction(implementor).operation()}")
        for implementor in implementors:
            out.line(f"  {RefinedAbstraction(implementor).operation()}")


example = BridgeExample()
