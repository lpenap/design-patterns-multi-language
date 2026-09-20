from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_factory1 import ConcreteFactory1
from .concrete_factory2 import ConcreteFactory2

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .abstract_factory import AbstractFactory


class AbstractFactoryExample:
    """The client: uses only the abstract factory and abstract product types."""

    id = "abstract-factory"

    def run(self, out: Output) -> None:
        out.line("Executing Abstract Factory Pattern Implementation")
        self._use_family(ConcreteFactory1(), out)
        self._use_family(ConcreteFactory2(), out)

    @staticmethod
    def _use_family(factory: AbstractFactory, out: Output) -> None:
        out.line(f"  {factory.create_product_a().name()}")
        out.line(f"  {factory.create_product_b().name()}")


example = AbstractFactoryExample()
