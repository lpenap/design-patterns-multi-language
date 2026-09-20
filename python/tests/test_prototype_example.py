from patterns.prototype import example
from patterns.runtime.contract import BufferOutput


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "prototype"
    assert out.lines == [
        "Executing Prototype Pattern Implementation",
        "  Original: ConcretePrototype1(state=alpha)",
        "  Clone: ConcretePrototype1(state=alpha)",
        "  Clone is a distinct object: true",
        "  Clone after setState(beta): ConcretePrototype1(state=beta)",
        "  Original after the clone changed: ConcretePrototype1(state=alpha)",
        "  ConcretePrototype2 clone: ConcretePrototype2(state=gamma)",
    ]
