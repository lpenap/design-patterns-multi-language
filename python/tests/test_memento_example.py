from patterns.memento import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "memento"
    assert out.lines == [
        "Executing Memento Pattern Implementation",
        "  Originator state: A (saved)",
        "  Originator state: B (saved)",
        "  Originator state: C",
        "  Restored: B",
        "  Restored: A",
    ]
