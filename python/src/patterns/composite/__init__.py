"""Composite: treat individual objects and compositions uniformly."""

from .component import Component
from .composite import Composite
from .example import CompositeExample, example
from .leaf import Leaf

__all__ = [
    "Component",
    "Leaf",
    "Composite",
    "CompositeExample",
    "example",
]
