"""Factory Method: let subclasses decide which class to instantiate."""

from abc import ABC, abstractmethod
from typing import Protocol

from patterns.runtime.contract import Output


class Product(Protocol):
    """The interface of the objects the factory method creates."""

    def name(self) -> str: ...


class ConcreteProductA:
    def name(self) -> str:
        return "ConcreteProductA"


class ConcreteProductB:
    def name(self) -> str:
        return "ConcreteProductB"


class Creator(ABC):
    """Declares the factory method and calls it from its template operation."""

    @abstractmethod
    def factory_method(self) -> Product: ...

    def an_operation(self) -> str:
        return f"Built {self.factory_method().name()}"


class ConcreteCreatorA(Creator):
    def factory_method(self) -> Product:
        return ConcreteProductA()


class ConcreteCreatorB(Creator):
    def factory_method(self) -> Product:
        return ConcreteProductB()


class FactoryMethodExample:
    """The client: uses creators through the Creator type only."""

    id = "factory-method"

    def run(self, out: Output) -> None:
        out.line("Executing Factory Method Pattern Implementation")
        creators: list[Creator] = [ConcreteCreatorA(), ConcreteCreatorB()]
        for creator in creators:
            out.line(f"  {creator.an_operation()}")


example = FactoryMethodExample()
