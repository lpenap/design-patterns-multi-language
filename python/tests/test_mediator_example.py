from patterns.mediator import (
    example,
)
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "mediator"
    assert out.lines == [
        "Executing Mediator Pattern Implementation",
        "  ConcreteColleague1 sends: hello",
        "  ConcreteColleague2 receives: hello",
        "  ConcreteColleague2 sends: hi",
        "  ConcreteColleague1 receives: hi",
    ]
