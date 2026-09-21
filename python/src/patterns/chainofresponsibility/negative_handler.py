from __future__ import annotations

from .handler import Handler


class NegativeHandler(Handler):
    def handle(self, request: int) -> str:
        return "negative" if request < 0 else super().handle(request)
