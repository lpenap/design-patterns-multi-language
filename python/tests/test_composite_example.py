from patterns.composite import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "composite"
    assert out.lines == [
        "Executing Composite Pattern Implementation",
        "  Leaf(A)",
        "  Composite(Leaf(A)+Leaf(B)+Composite(Leaf(C)))",
    ]
