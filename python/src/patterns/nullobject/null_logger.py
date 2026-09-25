class NullLogger:
    """The null object: honours the interface and does nothing, so clients need no null check."""

    def log(self, message: str) -> None:
        """Intentionally empty: a null object's whole point is to do nothing."""
