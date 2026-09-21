"""Flyweight: share fine-grained objects; keep the varying state outside them."""

from .concrete_flyweight import ConcreteFlyweight
from .example import FlyweightExample, example
from .flyweight import Flyweight
from .flyweight_factory import FlyweightFactory

__all__ = [
    "Flyweight",
    "ConcreteFlyweight",
    "FlyweightFactory",
    "FlyweightExample",
    "example",
]
