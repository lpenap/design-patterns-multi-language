from patterns.chainofresponsibility import (
    example,
)
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "chain-of-responsibility"
    assert out.lines == [
        "Executing Chain of Responsibility Pattern Implementation",
        "  -1 is negative",
        "  0 is zero",
        "  1 is positive",
    ]
