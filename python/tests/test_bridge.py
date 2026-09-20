from patterns.bridge import (
    Abstraction,
    ConcreteImplementorA,
    ConcreteImplementorB,
    RefinedAbstraction,
    example,
)
from patterns.runtime.contract import BufferOutput


def test_any_abstraction_works_with_any_implementor() -> None:
    assert Abstraction(ConcreteImplementorA()).operation() == "Abstraction(ConcreteImplementorA)"
    assert Abstraction(ConcreteImplementorB()).operation() == "Abstraction(ConcreteImplementorB)"
    assert RefinedAbstraction(ConcreteImplementorA()).operation() == (
        "RefinedAbstraction(ConcreteImplementorA)"
    )
    assert RefinedAbstraction(ConcreteImplementorB()).operation() == (
        "RefinedAbstraction(ConcreteImplementorB)"
    )


def test_a_new_implementor_needs_no_change_on_the_abstraction_side() -> None:
    class Custom:
        def operation_impl(self) -> str:
            return "Custom"

    assert Abstraction(Custom()).operation() == "Abstraction(Custom)"
    assert RefinedAbstraction(Custom()).operation() == "RefinedAbstraction(Custom)"


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "bridge"
    assert out.lines == [
        "Executing Bridge Pattern Implementation",
        "  Abstraction(ConcreteImplementorA)",
        "  Abstraction(ConcreteImplementorB)",
        "  RefinedAbstraction(ConcreteImplementorA)",
        "  RefinedAbstraction(ConcreteImplementorB)",
    ]
