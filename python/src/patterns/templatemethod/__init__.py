"""Template Method: fix an algorithm's skeleton, defer some steps to subclasses."""

from .abstract_class import AbstractClass
from .concrete_class_a import ConcreteClassA
from .concrete_class_b import ConcreteClassB
from .example import TemplateMethodExample, example

__all__ = [
    "AbstractClass",
    "ConcreteClassA",
    "ConcreteClassB",
    "TemplateMethodExample",
    "example",
]
