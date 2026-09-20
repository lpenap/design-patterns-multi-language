from typing import Protocol


class AbstractProductB(Protocol):
    def name(self) -> str: ...
