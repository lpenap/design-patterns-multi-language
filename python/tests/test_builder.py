from patterns.builder import ConcreteBuilder, Director, Product, example
from patterns.runtime.contract import BufferOutput


def test_the_director_fixes_the_sequence() -> None:
    assert Director().construct(ConcreteBuilder()).describe() == "Product(PartA, PartB)"


def test_a_builder_alone_produces_only_the_requested_parts() -> None:
    builder = ConcreteBuilder()
    assert builder.get_result().describe() == "Product()"
    builder.build_part_b()
    assert builder.get_result().describe() == "Product(PartB)"


def test_the_same_director_drives_a_different_representation() -> None:
    class ShortNames:
        def __init__(self) -> None:
            self.product = Product()

        def build_part_a(self) -> None:
            self.product.add("A")

        def build_part_b(self) -> None:
            self.product.add("B")

        def get_result(self) -> Product:
            return self.product

    assert Director().construct(ShortNames()).describe() == "Product(A, B)"


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "builder"
    assert out.lines == [
        "Executing Builder Pattern Implementation",
        "  Director.construct(ConcreteBuilder): Product(PartA, PartB)",
        "  ConcreteBuilder alone, only part B: Product(PartB)",
    ]
