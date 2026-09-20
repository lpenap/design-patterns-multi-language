"""Decorator: attach responsibilities to an object dynamically by wrapping it."""

from .component import Component
from .concrete_component import ConcreteComponent
from .concrete_decorator_a import ConcreteDecoratorA
from .concrete_decorator_b import ConcreteDecoratorB
from .decorator import Decorator
from .example import DecoratorExample, example

__all__ = [
    "Component",
    "ConcreteComponent",
    "Decorator",
    "ConcreteDecoratorA",
    "ConcreteDecoratorB",
    "DecoratorExample",
    "example",
]
