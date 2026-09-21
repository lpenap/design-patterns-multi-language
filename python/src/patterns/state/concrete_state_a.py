from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .context import Context


class ConcreteStateA:
    def handle(self, context: Context) -> None:
        # Local import: the two concrete states transition to each other.
        from .concrete_state_b import ConcreteStateB

        context.set_state(ConcreteStateB())

    def name(self) -> str:
        return "ConcreteStateA"
