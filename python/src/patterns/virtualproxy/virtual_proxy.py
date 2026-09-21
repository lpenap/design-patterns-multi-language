from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from collections.abc import Callable

    from .subject import Subject


class VirtualProxy:
    """Creates the real subject on the first request and forwards every request to it."""

    def __init__(self, loader: Callable[[], Subject]) -> None:
        self._loader = loader
        self._real_subject: Subject | None = None

    def request(self) -> str:
        if self._real_subject is None:
            self._real_subject = self._loader()
        return self._real_subject.request()

    def is_loaded(self) -> bool:
        return self._real_subject is not None
