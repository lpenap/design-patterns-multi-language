from patterns.runtime.contract import BufferOutput
from patterns.strategy import example


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "strategy"
    assert out.lines == [
        "Executing Strategy Pattern Implementation",
        "  Operation with --> algorithm from ConcreteStrategyA",
        "  Operation with ==> algorithm from ConcreteStrategyB",
    ]
