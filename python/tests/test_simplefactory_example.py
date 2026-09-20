from patterns.runtime.contract import BufferOutput
from patterns.simplefactory import example


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "simple-factory"
    assert out.lines == [
        "Executing Simple Factory Pattern Implementation",
        "  ConcreteProductA",
        "  ConcreteProductB",
    ]
