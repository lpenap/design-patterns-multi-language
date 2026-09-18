"""Chain of Responsibility: pass a request along linked handlers until one takes it."""

from __future__ import annotations

from patterns.runtime.contract import Output


class Handler:
    """Stores the successor and implements the default: forward, or answer "unhandled"."""

    def __init__(self) -> None:
        self._next: Handler | None = None

    def set_next(self, handler: Handler) -> Handler:
        """Link the successor and return it, so chains read left to right."""
        self._next = handler
        return handler

    def handle(self, request: int) -> str:
        return "unhandled" if self._next is None else self._next.handle(request)


class NegativeHandler(Handler):
    def handle(self, request: int) -> str:
        return "negative" if request < 0 else super().handle(request)


class ZeroHandler(Handler):
    def handle(self, request: int) -> str:
        return "zero" if request == 0 else super().handle(request)


class PositiveHandler(Handler):
    def handle(self, request: int) -> str:
        return "positive" if request > 0 else super().handle(request)


class ChainOfResponsibilityExample:
    """The client: assembles the chain and sends requests to its first link."""

    id = "chain-of-responsibility"

    def run(self, out: Output) -> None:
        out.line("Executing Chain of Responsibility Pattern Implementation")
        chain = NegativeHandler()
        chain.set_next(ZeroHandler()).set_next(PositiveHandler())
        for request in (-1, 0, 1):
            out.line(f"  {request} is {chain.handle(request)}")


example = ChainOfResponsibilityExample()
