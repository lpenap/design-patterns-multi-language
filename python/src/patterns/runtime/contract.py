"""The contract every pattern example honours (constitution Principle II)."""

from typing import Protocol, TextIO


class Output(Protocol):
    """The only channel through which an example emits text."""

    def line(self, text: str) -> None: ...


class Example(Protocol):
    """A runnable demonstration of one pattern; ``id`` equals the catalog id."""

    id: str

    def run(self, out: Output) -> None: ...


class BufferOutput:
    """Collects lines in memory."""

    def __init__(self) -> None:
        self.lines: list[str] = []

    def line(self, text: str) -> None:
        self.lines.append(text)


class ConsoleOutput:
    """Writes each line, newline-terminated, to a text stream."""

    def __init__(self, stream: TextIO) -> None:
        self._stream = stream

    def line(self, text: str) -> None:
        self._stream.write(text + "\n")
