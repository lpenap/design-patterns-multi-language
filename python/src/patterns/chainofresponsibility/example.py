from __future__ import annotations

from typing import TYPE_CHECKING

from .negative_handler import NegativeHandler
from .positive_handler import PositiveHandler
from .zero_handler import ZeroHandler

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


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
