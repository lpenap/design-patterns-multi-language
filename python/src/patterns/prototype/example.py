from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_prototype1 import ConcretePrototype1
from .concrete_prototype2 import ConcretePrototype2

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .prototype import Prototype


class PrototypeExample:
    """The client: creates new objects by asking prototypes to clone themselves."""

    id = "prototype"

    def run(self, out: Output) -> None:
        out.line("Executing Prototype Pattern Implementation")
        original = ConcretePrototype1("alpha")
        clone = original.clone()
        out.line(f"  Original: {original.describe()}")
        out.line(f"  Clone: {clone.describe()}")
        out.line(f"  Clone is a distinct object: {str(clone is not original).lower()}")
        clone.set_state("beta")
        out.line(f"  Clone after setState(beta): {clone.describe()}")
        out.line(f"  Original after the clone changed: {original.describe()}")
        second: Prototype = ConcretePrototype2("gamma")
        out.line(f"  ConcretePrototype2 clone: {second.clone().describe()}")


example = PrototypeExample()
