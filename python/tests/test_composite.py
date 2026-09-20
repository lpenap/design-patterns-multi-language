from patterns.composite import Component, Composite, Leaf, example
from patterns.runtime.contract import BufferOutput


def test_a_leaf_renders_its_name() -> None:
    assert Leaf("X").operation() == "Leaf(X)"


def test_an_empty_composite_renders_nothing_inside() -> None:
    assert Composite().operation() == "Composite()"


def test_composites_nest_to_any_depth() -> None:
    tree: Component = Composite().add(Leaf("A")).add(Composite().add(Composite().add(Leaf("B"))))
    assert tree.operation() == "Composite(Leaf(A)+Composite(Composite(Leaf(B))))"


def test_client_code_is_the_same_for_leaf_and_composite() -> None:
    components: list[Component] = [Leaf("A"), Composite().add(Leaf("A"))]
    assert [c.operation() for c in components] == ["Leaf(A)", "Composite(Leaf(A))"]


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "composite"
    assert out.lines == [
        "Executing Composite Pattern Implementation",
        "  Leaf(A)",
        "  Composite(Leaf(A)+Leaf(B)+Composite(Leaf(C)))",
    ]
