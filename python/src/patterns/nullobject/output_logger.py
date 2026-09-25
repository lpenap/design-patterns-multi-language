from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


class OutputLogger:
    """The real object: writes every message to the output."""

    def __init__(self, out: Output) -> None:
        self._out = out

    def log(self, message: str) -> None:
        self._out.line(f"    [log] {message}")
