from patterns.abstractfactory import (
    example,
)
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "abstract-factory"
    assert out.lines == [
        "Executing Abstract Factory Pattern Implementation",
        "  ProductA1",
        "  ProductB1",
        "  ProductA2",
        "  ProductB2",
    ]
