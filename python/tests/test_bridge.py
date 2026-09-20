from patterns.bridge import (
    Abstraction,
    ConcreteImplementorA,
    ConcreteImplementorB,
    RefinedAbstraction,
)


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
