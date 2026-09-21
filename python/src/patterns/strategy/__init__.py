"""Strategy: a family of interchangeable algorithms behind one interface."""

from .concrete_strategy_a import ConcreteStrategyA
from .concrete_strategy_b import ConcreteStrategyB
from .context import Context
from .example import StrategyExample, example
from .strategy import Strategy

__all__ = [
    "Strategy",
    "ConcreteStrategyA",
    "ConcreteStrategyB",
    "Context",
    "StrategyExample",
    "example",
]
