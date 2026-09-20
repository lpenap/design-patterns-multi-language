from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_component import ConcreteComponent
from .concrete_decorator_a import ConcreteDecoratorA
from .concrete_decorator_b import ConcreteDecoratorB

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .component import Component


class DecoratorExample:
    """The client: uses decorated and undecorated objects alike through Component."""

    id = "decorator"

    def run(self, out: Output) -> None:
        out.line("Executing Decorator Pattern Implementation")
        decorated: Component = ConcreteDecoratorA(ConcreteComponent())
        out.line(f"  {decorated.operation()}")
        twice: Component = ConcreteDecoratorB(decorated)
        out.line(f"  {twice.operation()}")


example = DecoratorExample()
