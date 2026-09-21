"""Chain of Responsibility: pass a request along linked handlers until one takes it."""

from .example import ChainOfResponsibilityExample, example
from .handler import Handler
from .negative_handler import NegativeHandler
from .positive_handler import PositiveHandler
from .zero_handler import ZeroHandler

__all__ = [
    "Handler",
    "NegativeHandler",
    "ZeroHandler",
    "PositiveHandler",
    "ChainOfResponsibilityExample",
    "example",
]
