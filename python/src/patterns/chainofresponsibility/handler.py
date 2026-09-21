from __future__ import annotations


class Handler:
    """Stores the successor and implements the default: forward, or answer "unhandled"."""

    def __init__(self) -> None:
        self._next: Handler | None = None

    def set_next(self, handler: Handler) -> Handler:
        """Link the successor and return it, so chains read left to right."""
        self._next = handler
        return handler

    def handle(self, request: int) -> str:
        return "unhandled" if self._next is None else self._next.handle(request)
