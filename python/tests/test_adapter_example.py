from patterns.adapter import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "adapter"
    assert out.lines == ["Executing Adapter Pattern Implementation", "  Adapter(Adaptee)"]
