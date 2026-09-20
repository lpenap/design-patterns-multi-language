"""Facade: one simple entry point in front of a subsystem."""

from .example import FacadeExample, example
from .facade import Facade
from .subsystem_a import SubsystemA
from .subsystem_b import SubsystemB
from .subsystem_c import SubsystemC

__all__ = [
    "SubsystemA",
    "SubsystemB",
    "SubsystemC",
    "Facade",
    "FacadeExample",
    "example",
]
