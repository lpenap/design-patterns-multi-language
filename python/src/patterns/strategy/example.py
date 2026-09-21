from typing import TYPE_CHECKING

from .concrete_strategy_a import ConcreteStrategyA
from .concrete_strategy_b import ConcreteStrategyB
from .context import Context

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


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
