from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_element_a import ConcreteElementA
from .concrete_element_b import ConcreteElementB
from .concrete_visitor1 import ConcreteVisitor1
from .concrete_visitor2 import ConcreteVisitor2
from .object_structure import ObjectStructure

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


class VisitorExample:
    """The client: creates visitors and applies them to the structure."""

    id = "visitor"

    def run(self, out: Output) -> None:
        out.line("Executing Visitor Pattern Implementation")
        structure = ObjectStructure()
        structure.add(ConcreteElementA())
        structure.add(ConcreteElementB())
        first = ConcreteVisitor1()
        structure.accept(first)
        out.line(f"  ConcreteVisitor1: {first.result()}")
        second = ConcreteVisitor2()
        structure.accept(second)
        out.line(f"  ConcreteVisitor2: {second.result()}")


example = VisitorExample()
