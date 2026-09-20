from patterns.bridge import (
    example,
)
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "bridge"
    assert out.lines == [
        "Executing Bridge Pattern Implementation",
        "  Abstraction(ConcreteImplementorA)",
        "  Abstraction(ConcreteImplementorB)",
        "  RefinedAbstraction(ConcreteImplementorA)",
        "  RefinedAbstraction(ConcreteImplementorB)",
    ]
