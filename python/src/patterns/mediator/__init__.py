"""Mediator: colleagues interact only through one object that encodes the rules."""

from .colleague import Colleague
from .concrete_colleague1 import ConcreteColleague1
from .concrete_colleague2 import ConcreteColleague2
from .concrete_mediator import ConcreteMediator
from .example import MediatorExample, example
from .mediator import Mediator

__all__ = [
    "Mediator",
    "Colleague",
    "ConcreteColleague1",
    "ConcreteColleague2",
    "ConcreteMediator",
    "MediatorExample",
    "example",
]
