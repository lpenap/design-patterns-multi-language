from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from collections.abc import Sequence

    from .logger import Logger


class OrderProcessor:
    """The client: uses its logger unconditionally, never asking whether it is "really there"."""

    def __init__(self, logger: Logger) -> None:
        self._logger = logger

    def process(self, orders: Sequence[str]) -> int:
        """Processes every order and returns how many were processed."""
        for order in orders:
            self._logger.log(f"processing {order}")
        return len(orders)
