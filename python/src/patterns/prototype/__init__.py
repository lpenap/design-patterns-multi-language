"""Prototype: create new objects by copying a prototypical instance."""

from .concrete_prototype1 import ConcretePrototype1
from .concrete_prototype2 import ConcretePrototype2
from .example import PrototypeExample, example
from .prototype import Prototype

__all__ = [
    "Prototype",
    "ConcretePrototype1",
    "ConcretePrototype2",
    "PrototypeExample",
    "example",
]
