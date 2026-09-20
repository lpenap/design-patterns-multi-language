"""Bridge: decouple an abstraction from its implementation so both can vary."""

from .abstraction import Abstraction
from .concrete_implementor_a import ConcreteImplementorA
from .concrete_implementor_b import ConcreteImplementorB
from .example import BridgeExample, example
from .implementor import Implementor
from .refined_abstraction import RefinedAbstraction

__all__ = [
    "Implementor",
    "ConcreteImplementorA",
    "ConcreteImplementorB",
    "Abstraction",
    "RefinedAbstraction",
    "BridgeExample",
    "example",
]
