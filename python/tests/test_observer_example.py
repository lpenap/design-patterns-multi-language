from patterns.observer import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "observer"
    assert out.lines == [
        "Executing Observer Pattern Implementation",
        "  observer1 notified: state 0 -> 5",
        "  observer2 notified: state 0 -> 5",
        "  observer1 notified: state 5 -> 10",
    ]
