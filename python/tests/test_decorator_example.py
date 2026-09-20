from patterns.decorator import (
    example,
)
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "decorator"
    assert out.lines == [
        "Executing Decorator Pattern Implementation",
        "  ConcreteDecoratorA(ConcreteComponent)",
        "  ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))",
    ]
