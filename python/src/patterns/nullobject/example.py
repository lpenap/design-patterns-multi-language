from __future__ import annotations

from typing import TYPE_CHECKING

from .null_logger import NullLogger
from .order_processor import OrderProcessor
from .output_logger import OutputLogger

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


class NullObjectExample:
    """Runs the same client once with a real logger and once with the null logger."""

    id = "null-object"

    def run(self, out: Output) -> None:
        out.line("Executing Null Object Pattern Implementation")
        orders = ["order 1", "order 2"]
        out.line("  OrderProcessor with OutputLogger:")
        out.line(f"    processed {OrderProcessor(OutputLogger(out)).process(orders)} orders")
        out.line("  OrderProcessor with NullLogger:")
        out.line(f"    processed {OrderProcessor(NullLogger()).process(orders)} orders")
        out.line("  The processor never tested its logger for null")


example = NullObjectExample()
