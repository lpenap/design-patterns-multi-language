"""Observer: notify dependents automatically when a subject's state changes."""

from .concrete_observer import ConcreteObserver
from .concrete_subject import ConcreteSubject
from .example import ObserverExample, example
from .observer import Observer
from .subject import Subject

__all__ = [
    "Observer",
    "Subject",
    "ConcreteSubject",
    "ConcreteObserver",
    "ObserverExample",
    "example",
]
