from __future__ import annotations

from typing import TYPE_CHECKING

from .concrete_colleague1 import ConcreteColleague1
from .concrete_colleague2 import ConcreteColleague2
from .concrete_mediator import ConcreteMediator

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


class MediatorExample:
    """The client: wires colleagues to the mediator and triggers messages."""

    id = "mediator"

    def run(self, out: Output) -> None:
        out.line("Executing Mediator Pattern Implementation")
        mediator = ConcreteMediator()
        one = ConcreteColleague1(mediator)
        two = ConcreteColleague2(mediator)
        mediator.set_colleague1(one)
        mediator.set_colleague2(two)
        for sender, receiver, message in ((one, two, "hello"), (two, one, "hi")):
            sender.send(message)
            out.line(f"  {sender.name()} sends: {message}")
            out.line(f"  {receiver.name()} receives: {receiver.received()[-1]}")


example = MediatorExample()
