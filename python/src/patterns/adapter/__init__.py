"""Adapter (object form): convert an interface into the one the client expects."""

from .adaptee import Adaptee
from .adapter import Adapter
from .example import AdapterExample, example
from .target import Target

__all__ = [
    "Target",
    "Adaptee",
    "Adapter",
    "AdapterExample",
    "example",
]
