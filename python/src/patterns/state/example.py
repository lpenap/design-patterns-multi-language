from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_state_a import ConcreteStateA
from .context import Context

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


class StateExample:
    """The client: issues requests to the context and never touches the states."""

    id = "state"

    def run(self, out: Output) -> None:
        out.line("Executing State Pattern Implementation")
        context = Context(ConcreteStateA())
        out.line(f"  Context in {context.get_state_name()}")
        out.line(f"  {context.request()}")
        out.line(f"  {context.request()}")


example = StateExample()
