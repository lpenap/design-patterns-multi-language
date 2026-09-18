"""Observer: notify dependents automatically when a subject's state changes."""

from collections.abc import Callable
from typing import Protocol

from patterns.runtime.contract import Output


class Observer(Protocol):
    """The notification interface; push model: the change is carried in the call."""

    def update(self, old_state: int, new_state: int) -> None: ...


class Subject:
    """Knows its observers and notifies them in attachment order."""

    def __init__(self) -> None:
        self._observers: list[Observer] = []

    def attach(self, observer: Observer) -> None:
        self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        self._observers.remove(observer)

    def notify_observers(self, old_state: int, new_state: int) -> None:
        for observer in list(self._observers):
            observer.update(old_state, new_state)


class ConcreteSubject(Subject):
    """Holds the state of interest and notifies when it changes."""

    def __init__(self) -> None:
        super().__init__()
        self._state = 0

    def get_state(self) -> int:
        return self._state

    def set_state(self, new_state: int) -> None:
        if new_state == self._state:
            return
        old_state = self._state
        self._state = new_state
        self.notify_observers(old_state, new_state)


class ConcreteObserver:
    """Reports the change it was told about through a callback supplied by its creator."""

    def __init__(self, name: str, report: Callable[[str], None]) -> None:
        self._name = name
        self._report = report

    def update(self, old_state: int, new_state: int) -> None:
        self._report(f"{self._name} notified: state {old_state} -> {new_state}")


class ObserverExample:
    """The client: wires subject and observers and drives the changes."""

    id = "observer"

    def run(self, out: Output) -> None:
        out.line("Executing Observer Pattern Implementation")
        subject = ConcreteSubject()
        observer1 = ConcreteObserver("observer1", lambda text: out.line(f"  {text}"))
        observer2 = ConcreteObserver("observer2", lambda text: out.line(f"  {text}"))
        subject.attach(observer1)
        subject.attach(observer2)
        subject.set_state(5)
        subject.detach(observer2)
        subject.set_state(10)


example = ObserverExample()
