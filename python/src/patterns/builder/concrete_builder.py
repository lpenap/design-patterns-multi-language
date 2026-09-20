from .product import Product


class ConcreteBuilder:
    """Assembles the parts into one representation and hands it out."""

    def __init__(self) -> None:
        self._product = Product()

    def build_part_a(self) -> None:
        self._product.add("PartA")

    def build_part_b(self) -> None:
        self._product.add("PartB")

    def get_result(self) -> Product:
        return self._product
