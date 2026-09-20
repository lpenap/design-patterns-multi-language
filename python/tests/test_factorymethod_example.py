from patterns.factorymethod import (
    example,
)
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "factory-method"
    assert out.lines == [
        "Executing Factory Method Pattern Implementation",
        "  Built ConcreteProductA",
        "  Built ConcreteProductB",
    ]
