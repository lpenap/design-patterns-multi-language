from patterns.decorator import (
    Component,
    ConcreteComponent,
    ConcreteDecoratorA,
    ConcreteDecoratorB,
    Decorator,
    example,
)
from patterns.runtime.contract import BufferOutput


def test_adds_behaviour_around_the_component() -> None:
    assert ConcreteDecoratorA(ConcreteComponent()).operation() == (
        "ConcreteDecoratorA(ConcreteComponent)"
    )


def test_nests_in_any_order_and_can_be_applied_twice() -> None:
    c = ConcreteComponent()
    assert ConcreteDecoratorB(ConcreteDecoratorA(c)).operation() == (
        "ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))"
    )
    assert ConcreteDecoratorA(ConcreteDecoratorB(c)).operation() == (
        "ConcreteDecoratorA(ConcreteDecoratorB(ConcreteComponent))"
    )
    assert ConcreteDecoratorA(ConcreteDecoratorA(c)).operation() == (
        "ConcreteDecoratorA(ConcreteDecoratorA(ConcreteComponent))"
    )


def test_base_decorator_forwards_unchanged_and_is_not_its_component() -> None:
    c: Component = ConcreteComponent()
    plain: Component = Decorator(c)
    assert plain.operation() == "ConcreteComponent"
    assert plain is not c


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "decorator"
    assert out.lines == [
        "Executing Decorator Pattern Implementation",
        "  ConcreteDecoratorA(ConcreteComponent)",
        "  ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))",
    ]
