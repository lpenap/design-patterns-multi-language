from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .component import Component


class Decorator:
    """Holds the wrapped component and forwards to it; subclasses add behaviour."""

    def __init__(self, component: Component) -> None:
        self._component = component

    def operation(self) -> str:
        return self._component.operation()
