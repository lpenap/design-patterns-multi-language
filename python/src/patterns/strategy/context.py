from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .strategy import Strategy


class Context:
    """Holds a strategy and delegates to it; the strategy can be replaced at run time."""

    def __init__(self, strategy: Strategy) -> None:
        self._strategy = strategy

    def operation(self) -> str:
        return f"Operation with {self._strategy.execute_algorithm()}"

    def set_strategy(self, strategy: Strategy) -> None:
        self._strategy = strategy
