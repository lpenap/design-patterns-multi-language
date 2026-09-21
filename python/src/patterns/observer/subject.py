from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .observer import Observer


class Subject:
    """Knows its observers and notifies them in attachment order."""

    def __init__(self) -> None:
        self._observers: list[Observer] = []

    def attach(self, observer: Observer) -> None:
        self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        self._observers.remove(observer)

    def notify_observers(self, old_state: int, new_state: int) -> None:
        for observer in list(self._observers):
            observer.update(old_state, new_state)
