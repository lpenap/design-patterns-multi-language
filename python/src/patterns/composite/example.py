from __future__ import annotations

from typing import TYPE_CHECKING

from .composite import Composite
from .leaf import Leaf

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .component import Component


class CompositeExample:
    """The client: manipulates leaves and trees through Component alike."""

    id = "composite"

    def run(self, out: Output) -> None:
        out.line("Executing Composite Pattern Implementation")
        leaf: Component = Leaf("A")
        tree: Component = Composite().add(Leaf("A")).add(Leaf("B")).add(Composite().add(Leaf("C")))
        out.line(f"  {leaf.operation()}")
        out.line(f"  {tree.operation()}")


example = CompositeExample()
