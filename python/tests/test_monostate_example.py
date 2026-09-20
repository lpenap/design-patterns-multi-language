from patterns.monostate import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "monostate"
    assert out.lines == [
        "Executing Monostate Pattern Implementation",
        "  Two instances are distinct objects: true",
        "  a.setValue(42) then b.getValue(): 42",
        "  b.setValue(7) then a.getValue(): 7",
    ]
