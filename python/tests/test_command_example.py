from patterns.command import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "command"
    assert out.lines == [
        "Executing Command Pattern Implementation",
        "  Executed ConcreteCommand(Hello): state = Hello",
        "  Executed ConcreteCommand(World): state = Hello World",
        "  Undone ConcreteCommand(World): state = Hello",
    ]
