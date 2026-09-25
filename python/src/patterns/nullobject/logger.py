from typing import Protocol


class Logger(Protocol):
    """The abstract object: the collaborator every client depends on."""

    def log(self, message: str) -> None: ...
