"""Builder: separate the construction of a complex object from its representation."""

from typing import Protocol

from patterns.runtime.contract import Output


class Product:
    """The complex object under construction."""

    def __init__(self) -> None:
        self._parts: list[str] = []

    def add(self, part: str) -> None:
        self._parts.append(part)

    def describe(self) -> str:
        return f"Product({', '.join(self._parts)})"


class Builder(Protocol):
    """The abstract interface for creating parts of a product."""

    def build_part_a(self) -> None: ...

    def build_part_b(self) -> None: ...

    def get_result(self) -> Product: ...


class ConcreteBuilder:
    """Assembles the parts into one representation and hands it out."""

    def __init__(self) -> None:
        self._product = Product()

    def build_part_a(self) -> None:
        self._product.add("PartA")

    def build_part_b(self) -> None:
        self._product.add("PartB")

    def get_result(self) -> Product:
        return self._product


class Director:
    """Owns the sequence of construction steps; knows nothing of the representation."""

    def construct(self, builder: Builder) -> Product:
        builder.build_part_a()
        builder.build_part_b()
        return builder.get_result()


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
