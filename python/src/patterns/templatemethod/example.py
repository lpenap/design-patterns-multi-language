from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_class_a import ConcreteClassA
from .concrete_class_b import ConcreteClassB

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .abstract_class import AbstractClass


class TemplateMethodExample:
    """The client: calls the template method through the abstract type."""

    id = "template-method"

    def run(self, out: Output) -> None:
        out.line("Executing Template Method Pattern Implementation")
        instances: list[AbstractClass] = [ConcreteClassA(), ConcreteClassB()]
        for instance in instances:
            out.line(f"  {instance.template_method()}")


example = TemplateMethodExample()
