from typing import Protocol


class Target(Protocol):
    """The domain-specific interface the client uses."""

    def request(self) -> str: ...
