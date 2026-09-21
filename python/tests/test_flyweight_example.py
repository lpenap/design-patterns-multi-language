from patterns.flyweight import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "flyweight"
    assert out.lines == [
        "Executing Flyweight Pattern Implementation",
        "  ConcreteFlyweight(a) with extrinsic state 1",
        "  ConcreteFlyweight(b) with extrinsic state 2",
        "  ConcreteFlyweight(a) with extrinsic state 3",
        "  Flyweights created: 2 for 3 requests",
    ]
