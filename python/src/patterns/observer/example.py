from typing import TYPE_CHECKING

from .concrete_observer import ConcreteObserver
from .concrete_subject import ConcreteSubject

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


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
