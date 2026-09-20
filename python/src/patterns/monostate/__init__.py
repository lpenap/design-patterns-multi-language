"""Monostate: ordinary instances that share all their state (a.k.a. Borg)."""

from .example import MonostateExample, example
from .monostate import Monostate

__all__ = [
    "Monostate",
    "MonostateExample",
    "example",
]
