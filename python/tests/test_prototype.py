from patterns.prototype import ConcretePrototype1, ConcretePrototype2, Prototype, example
from patterns.runtime.contract import BufferOutput


def test_a_clone_is_a_distinct_object_with_equal_state() -> None:
    original = ConcretePrototype1("x")
    clone = original.clone()
    assert clone is not original
    assert clone.describe() == original.describe()


def test_changing_the_clone_leaves_the_original_untouched() -> None:
    original = ConcretePrototype2("x")
    clone = original.clone()
    clone.set_state("y")
    assert original.describe() == "ConcretePrototype2(state=x)"
    assert clone.describe() == "ConcretePrototype2(state=y)"


def test_cloning_through_the_interface_preserves_the_concrete_class() -> None:
    prototypes: list[Prototype] = [ConcretePrototype1("a"), ConcretePrototype2("b")]
    assert isinstance(prototypes[0].clone(), ConcretePrototype1)
    assert isinstance(prototypes[1].clone(), ConcretePrototype2)


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
