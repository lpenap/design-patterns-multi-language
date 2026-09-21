from patterns.runtime.contract import BufferOutput
from patterns.visitor import (
    example,
)


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "visitor"
    assert out.lines == [
        "Executing Visitor Pattern Implementation",
        "  ConcreteVisitor1: visited ConcreteElementA, visited ConcreteElementB",
        "  ConcreteVisitor2: A+B",
    ]
