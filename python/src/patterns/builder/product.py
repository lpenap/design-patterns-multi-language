class Product:
    """The complex object under construction."""

    def __init__(self) -> None:
        self._parts: list[str] = []

    def add(self, part: str) -> None:
        self._parts.append(part)

    def describe(self) -> str:
        return f"Product({', '.join(self._parts)})"
