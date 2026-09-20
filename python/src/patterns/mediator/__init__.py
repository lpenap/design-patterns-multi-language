"""Mediator: colleagues interact only through one object that encodes the rules."""

from __future__ import annotations

from typing import Protocol

from patterns.runtime.contract import Output


class Mediator(Protocol):
    """Defines the interface for communicating with colleagues."""

    def notify(self, sender: Colleague, message: str) -> None: ...


class Colleague:
    """Knows its mediator and communicates with it, never with other colleagues."""

    def __init__(self, mediator: Mediator) -> None:
        self._mediator = mediator
        self._received: list[str] = []

    def send(self, message: str) -> None:
        self._mediator.notify(self, message)

    def receive(self, message: str) -> None:
        self._received.append(message)

    def received(self) -> list[str]:
        return list(self._received)

    def name(self) -> str:
        return type(self).__name__


class ConcreteColleague1(Colleague):
    pass


class ConcreteColleague2(Colleague):
    pass


class ConcreteMediator:
    """Knows its colleagues and implements the cooperative behaviour: route to the other one."""

    def __init__(self) -> None:
        self._colleague1: Colleague | None = None
        self._colleague2: Colleague | None = None

    def set_colleague1(self, colleague: Colleague) -> None:
        self._colleague1 = colleague

    def set_colleague2(self, colleague: Colleague) -> None:
        self._colleague2 = colleague

    def notify(self, sender: Colleague, message: str) -> None:
        target = self._colleague2 if sender is self._colleague1 else self._colleague1
        if target is not None:
            target.receive(message)


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
