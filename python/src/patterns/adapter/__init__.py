"""Adapter (object form): convert an interface into the one the client expects."""

from typing import Protocol

from patterns.runtime.contract import Output


class Target(Protocol):
    """The domain-specific interface the client uses."""

    def request(self) -> str: ...


class Adaptee:
    """An existing class with a useful but incompatible operation."""

    def specific_request(self) -> str:
        return "Adaptee"


class Adapter:
    """Implements Target by delegating to the Adaptee it holds."""

    def __init__(self, adaptee: Adaptee) -> None:
        self._adaptee = adaptee

    def request(self) -> str:
        return f"Adapter({self._adaptee.specific_request()})"


class AdapterExample:
    """The client: collaborates through Target only."""

    id = "adapter"

    def run(self, out: Output) -> None:
        out.line("Executing Adapter Pattern Implementation")
        target: Target = Adapter(Adaptee())
        out.line(f"  {target.request()}")


example = AdapterExample()
