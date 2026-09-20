from typing import Protocol


class AbstractProductA(Protocol):
    def name(self) -> str: ...
