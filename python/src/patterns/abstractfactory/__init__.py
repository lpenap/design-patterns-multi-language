"""Abstract Factory: create families of related objects without naming their classes."""

from typing import Protocol

from patterns.runtime.contract import Output


class AbstractProductA(Protocol):
    def name(self) -> str: ...


class AbstractProductB(Protocol):
    def name(self) -> str: ...


class AbstractFactory(Protocol):
    """Declares one creation operation per abstract product."""

    def create_product_a(self) -> AbstractProductA: ...

    def create_product_b(self) -> AbstractProductB: ...


class ProductA1:
    def name(self) -> str:
        return "ProductA1"


class ProductA2:
    def name(self) -> str:
        return "ProductA2"


class ProductB1:
    def name(self) -> str:
        return "ProductB1"


class ProductB2:
    def name(self) -> str:
        return "ProductB2"


class ConcreteFactory1:
    """Creates the products of family 1."""

    def create_product_a(self) -> AbstractProductA:
        return ProductA1()

    def create_product_b(self) -> AbstractProductB:
        return ProductB1()


class ConcreteFactory2:
    """Creates the products of family 2."""

    def create_product_a(self) -> AbstractProductA:
        return ProductA2()

    def create_product_b(self) -> AbstractProductB:
        return ProductB2()


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
