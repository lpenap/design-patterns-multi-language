from __future__ import annotations

from typing import TYPE_CHECKING

from .adaptee import Adaptee
from .adapter import Adapter

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .target import Target


class AdapterExample:
    """The client: collaborates through Target only."""

    id = "adapter"

    def run(self, out: Output) -> None:
        out.line("Executing Adapter Pattern Implementation")
        target: Target = Adapter(Adaptee())
        out.line(f"  {target.request()}")


example = AdapterExample()
