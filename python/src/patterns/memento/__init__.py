"""Memento: capture an object's state so it can be restored, without exposing it."""

from .caretaker import Caretaker
from .example import MementoExample, example
from .memento import Memento
from .originator import Originator

__all__ = [
    "Memento",
    "Originator",
    "Caretaker",
    "MementoExample",
    "example",
]
