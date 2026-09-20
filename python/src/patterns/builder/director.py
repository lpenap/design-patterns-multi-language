from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .builder import Builder
    from .product import Product


class Director:
    """Owns the sequence of construction steps; knows nothing of the representation."""

    def construct(self, builder: Builder) -> Product:
        builder.build_part_a()
        builder.build_part_b()
        return builder.get_result()
