"""Visitor: define new operations over an object structure without changing its classes."""

from .concrete_element_a import ConcreteElementA
from .concrete_element_b import ConcreteElementB
from .concrete_visitor1 import ConcreteVisitor1
from .concrete_visitor2 import ConcreteVisitor2
from .element import Element
from .example import VisitorExample, example
from .object_structure import ObjectStructure
from .visitor import Visitor

__all__ = [
    "Visitor",
    "Element",
    "ConcreteElementA",
    "ConcreteElementB",
    "ConcreteVisitor1",
    "ConcreteVisitor2",
    "ObjectStructure",
    "VisitorExample",
    "example",
]
