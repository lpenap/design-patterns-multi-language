from patterns.strategy import ConcreteStrategyA, ConcreteStrategyB, Context


def test_operation_delegates_to_the_configured_strategy() -> None:
    assert Context(ConcreteStrategyA()).operation() == (
        "Operation with --> algorithm from ConcreteStrategyA"
    )
    assert Context(ConcreteStrategyB()).operation() == (
        "Operation with ==> algorithm from ConcreteStrategyB"
    )


def test_switching_the_strategy_changes_the_next_operation() -> None:
    context = Context(ConcreteStrategyA())
    context.set_strategy(ConcreteStrategyB())
    assert context.operation() == "Operation with ==> algorithm from ConcreteStrategyB"


def test_any_object_with_the_method_is_a_strategy() -> None:
    class Inline:
        def execute_algorithm(self) -> str:
            return "inline"

    assert Context(Inline()).operation() == "Operation with inline"
