from patterns.runtime.contract import BufferOutput
from patterns.state import example


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "state"
    assert out.lines == [
        "Executing State Pattern Implementation",
        "  Context in ConcreteStateA",
        "  request() handled by ConcreteStateA, now in ConcreteStateB",
        "  request() handled by ConcreteStateB, now in ConcreteStateA",
    ]
