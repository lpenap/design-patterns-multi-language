"""State: let an object alter its behaviour when its internal state changes."""

from __future__ import annotations

from typing import Protocol

from patterns.runtime.contract import Output


class State(Protocol):
    """The interface for behaviour associated with one state of the Context."""

    def handle(self, context: Context) -> None: ...

    def name(self) -> str: ...


class ConcreteStateA:
    def handle(self, context: Context) -> None:
        context.set_state(ConcreteStateB())

    def name(self) -> str:
        return "ConcreteStateA"


class ConcreteStateB:
    def handle(self, context: Context) -> None:
        context.set_state(ConcreteStateA())

    def name(self) -> str:
        return "ConcreteStateB"


class Context:
    """Holds the current state and delegates state-specific requests to it."""

    def __init__(self, initial: State) -> None:
        self._state = initial

    def request(self) -> str:
        before = self._state.name()
        self._state.handle(self)
        return f"request() handled by {before}, now in {self._state.name()}"

    def set_state(self, state: State) -> None:
        self._state = state

    def get_state_name(self) -> str:
        return self._state.name()


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
