from __future__ import annotations

from .handler import Handler


class ZeroHandler(Handler):
    def handle(self, request: int) -> str:
        return "zero" if request == 0 else super().handle(request)
