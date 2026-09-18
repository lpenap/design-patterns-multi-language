"""Strategy: a family of interchangeable algorithms behind one interface."""

from typing import Protocol

from patterns.runtime.contract import Output


class Strategy(Protocol):
    """The interface common to all algorithms."""

    def execute_algorithm(self) -> str: ...


class ConcreteStrategyA:
    def execute_algorithm(self) -> str:
        return "--> algorithm from ConcreteStrategyA"


class ConcreteStrategyB:
    def execute_algorithm(self) -> str:
        return "==> algorithm from ConcreteStrategyB"


class Context:
    """Holds a strategy and delegates to it; the strategy can be replaced at run time."""

    def __init__(self, strategy: Strategy) -> None:
        self._strategy = strategy

    def operation(self) -> str:
        return f"Operation with {self._strategy.execute_algorithm()}"

    def set_strategy(self, strategy: Strategy) -> None:
        self._strategy = strategy


class StrategyExample:
    """The client: chooses the strategies and hands them to the context."""

    id = "strategy"

    def run(self, out: Output) -> None:
        out.line("Executing Strategy Pattern Implementation")
        context = Context(ConcreteStrategyA())
        out.line(f"  {context.operation()}")
        context.set_strategy(ConcreteStrategyB())
        out.line(f"  {context.operation()}")


example = StrategyExample()
