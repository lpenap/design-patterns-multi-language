from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .context import Context


class ConcreteStateB:
    def handle(self, context: Context) -> None:
        # Local import: the two concrete states transition to each other.
        from .concrete_state_a import ConcreteStateA

        context.set_state(ConcreteStateA())

    def name(self) -> str:
        return "ConcreteStateB"
