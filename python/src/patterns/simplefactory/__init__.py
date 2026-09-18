"""Simple Factory: one method decides which concrete product to instantiate."""

from typing import Protocol

from patterns.runtime.contract import Output


class Product(Protocol):
    """The interface every product implements."""

    def name(self) -> str: ...


class ConcreteProductA:
    def name(self) -> str:
        return "ConcreteProductA"


class ConcreteProductB:
    def name(self) -> str:
        return "ConcreteProductB"


class SimpleFactory:
    """Maps a type code to a concrete product; the single place where products are created."""

    def create_product(self, type_code: str) -> Product:
        match type_code:
            case "A":
                return ConcreteProductA()
            case "B":
                return ConcreteProductB()
            case _:
                raise ValueError(f"Unknown product type: {type_code}")


class SimpleFactoryExample:
    """The client: requests products by type code and uses them through Product."""

    id = "simple-factory"

    def run(self, out: Output) -> None:
        out.line("Executing Simple Factory Pattern Implementation")
        factory = SimpleFactory()
        a = factory.create_product("A")
        b = factory.create_product("B")
        out.line(f"  {a.name()}")
        out.line(f"  {b.name()}")


example = SimpleFactoryExample()
