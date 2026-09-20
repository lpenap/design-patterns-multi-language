from typing import TYPE_CHECKING

from .facade import Facade

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


class FacadeExample:
    """The client: talks to the facade only."""

    id = "facade"

    def run(self, out: Output) -> None:
        out.line("Executing Facade Pattern Implementation")
        out.line(f"  {Facade().operation()}")


example = FacadeExample()
