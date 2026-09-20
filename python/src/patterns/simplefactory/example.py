from typing import TYPE_CHECKING

from .simple_factory import SimpleFactory

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


class SimpleFactoryExample:
    """The client: requests products by type code and uses them through Product."""

    id = "simple-factory"

    def run(self, out: Output) -> None:
        out.line("Executing Simple Factory Pattern Implementation")
        factory = SimpleFactory()
        a = factory.create_product("A")
        b = factory.create_product("B")
        out.line(f"  {a.name()}")
        out.line(f"  {b.name()}")


example = SimpleFactoryExample()
