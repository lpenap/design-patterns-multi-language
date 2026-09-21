from typing import TYPE_CHECKING

from .flyweight_factory import FlyweightFactory

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


class FlyweightExample:
    """The client: keeps the extrinsic state and obtains flyweights from the factory only."""

    id = "flyweight"

    def run(self, out: Output) -> None:
        out.line("Executing Flyweight Pattern Implementation")
        factory = FlyweightFactory()
        keys = ["a", "b", "a"]
        for extrinsic_state, key in enumerate(keys, start=1):
            out.line(f"  {factory.get_flyweight(key).operation(extrinsic_state)}")
        out.line(f"  Flyweights created: {factory.count()} for {len(keys)} requests")


example = FlyweightExample()
