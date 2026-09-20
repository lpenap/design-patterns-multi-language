from __future__ import annotations

from abc import ABC, abstractmethod
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .product import Product


class Creator(ABC):
    """Declares the factory method and calls it from its template operation."""

    @abstractmethod
    def factory_method(self) -> Product: ...

    def an_operation(self) -> str:
        return f"Built {self.factory_method().name()}"
