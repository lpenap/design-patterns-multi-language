from __future__ import annotations

from .handler import Handler


class PositiveHandler(Handler):
    def handle(self, request: int) -> str:
        return "positive" if request > 0 else super().handle(request)
