"""Null Object: a do-nothing collaborator with the expected interface, never tested for None."""

from .example import NullObjectExample, example
from .logger import Logger
from .null_logger import NullLogger
from .order_processor import OrderProcessor
from .output_logger import OutputLogger

__all__ = [
    "Logger",
    "OutputLogger",
    "NullLogger",
    "OrderProcessor",
    "NullObjectExample",
    "example",
]
