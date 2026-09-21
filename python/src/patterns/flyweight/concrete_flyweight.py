class ConcreteFlyweight:
    """Stores intrinsic state; immutable, therefore sharable."""

    def __init__(self, intrinsic_state: str) -> None:
        self._intrinsic_state = intrinsic_state

    def operation(self, extrinsic_state: int) -> str:
        return f"ConcreteFlyweight({self._intrinsic_state}) with extrinsic state {extrinsic_state}"
