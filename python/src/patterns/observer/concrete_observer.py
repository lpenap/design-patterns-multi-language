from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from collections.abc import Callable


class ConcreteObserver:
    """Reports the change it was told about through a callback supplied by its creator."""

    def __init__(self, name: str, report: Callable[[str], None]) -> None:
        self._name = name
        self._report = report

    def update(self, old_state: int, new_state: int) -> None:
        self._report(f"{self._name} notified: state {old_state} -> {new_state}")
