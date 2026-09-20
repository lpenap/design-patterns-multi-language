from patterns.flyweight import ConcreteFlyweight, FlyweightFactory, example
from patterns.runtime.contract import BufferOutput


def test_the_same_key_yields_the_same_object() -> None:
    factory = FlyweightFactory()
    assert factory.get_flyweight("a") is factory.get_flyweight("a")
    assert factory.get_flyweight("a") is not factory.get_flyweight("b")


def test_the_pool_grows_only_with_distinct_keys() -> None:
    factory = FlyweightFactory()
    for key in ["x", "y", "x", "x", "z"]:
        factory.get_flyweight(key)
    assert factory.count() == 3


def test_operation_combines_intrinsic_and_extrinsic_state() -> None:
    assert ConcreteFlyweight("q").operation(42) == "ConcreteFlyweight(q) with extrinsic state 42"


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
