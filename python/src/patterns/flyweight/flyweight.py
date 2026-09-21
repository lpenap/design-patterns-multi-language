from typing import Protocol


class Flyweight(Protocol):
    """Receives extrinsic state and acts on it together with its intrinsic state."""

    def operation(self, extrinsic_state: int) -> str: ...
