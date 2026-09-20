"""Bridge: decouple an abstraction from its implementation so both can vary."""

from typing import Protocol

from patterns.runtime.contract import Output


class Implementor(Protocol):
    """The interface for implementation classes: primitive operations only."""

    def operation_impl(self) -> str: ...


class ConcreteImplementorA:
    def operation_impl(self) -> str:
        return "ConcreteImplementorA"


class ConcreteImplementorB:
    def operation_impl(self) -> str:
        return "ConcreteImplementorB"


class Abstraction:
    """Holds the implementor and forwards the primitive operation to it."""

    def __init__(self, implementor: Implementor) -> None:
        self._implementor = implementor

    def operation(self) -> str:
        return f"Abstraction({self._implementor.operation_impl()})"


class RefinedAbstraction(Abstraction):
    """Extends the abstraction's behaviour without knowing the concrete implementor."""

    def operation(self) -> str:
        return f"RefinedAbstraction({self._implementor.operation_impl()})"


class BridgeExample:
    """The client: combines each abstraction with each implementor."""

    id = "bridge"

    def run(self, out: Output) -> None:
        out.line("Executing Bridge Pattern Implementation")
        implementors: list[Implementor] = [ConcreteImplementorA(), ConcreteImplementorB()]
        for implementor in implementors:
            out.line(f"  {Abstraction(implementor).operation()}")
        for implementor in implementors:
            out.line(f"  {RefinedAbstraction(implementor).operation()}")


example = BridgeExample()
