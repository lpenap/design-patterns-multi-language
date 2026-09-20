from patterns.builder import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "builder"
    assert out.lines == [
        "Executing Builder Pattern Implementation",
        "  Director.construct(ConcreteBuilder): Product(PartA, PartB)",
        "  ConcreteBuilder alone, only part B: Product(PartB)",
    ]
