"""Command: encapsulate a request as an object, with undo."""

from typing import Protocol

from patterns.runtime.contract import Output


class Command(Protocol):
    """Declares the interface for executing and undoing an operation."""

    def execute(self) -> None: ...

    def undo(self) -> None: ...

    def describe(self) -> str: ...


class Receiver:
    """Knows how to perform the operations associated with a request."""

    def __init__(self) -> None:
        self._words: list[str] = []

    def action(self, word: str) -> None:
        self._words.append(word)

    def reverse(self, word: str) -> None:
        if word in self._words:
            del self._words[len(self._words) - 1 - self._words[::-1].index(word)]

    def get_state(self) -> str:
        return " ".join(self._words)


class ConcreteCommand:
    """Binds a receiver to an action and knows how to reverse it."""

    def __init__(self, receiver: Receiver, word: str) -> None:
        self._receiver = receiver
        self._word = word

    def execute(self) -> None:
        self._receiver.action(self._word)

    def undo(self) -> None:
        self._receiver.reverse(self._word)

    def describe(self) -> str:
        return f"ConcreteCommand({self._word})"


class Invoker:
    """Asks commands to carry out requests and keeps the history for undo."""

    def __init__(self) -> None:
        self._history: list[Command] = []

    def execute(self, command: Command) -> None:
        command.execute()
        self._history.append(command)

    def undo(self) -> Command | None:
        """Undo the most recent command and return it, or None if there is none."""
        if not self._history:
            return None
        last = self._history.pop()
        last.undo()
        return last


class CommandExample:
    """The client: creates commands bound to a receiver and hands them to the invoker."""

    id = "command"

    def run(self, out: Output) -> None:
        out.line("Executing Command Pattern Implementation")
        receiver = Receiver()
        invoker = Invoker()
        for word in ("Hello", "World"):
            command = ConcreteCommand(receiver, word)
            invoker.execute(command)
            out.line(f"  Executed {command.describe()}: state = {receiver.get_state()}")
        undone = invoker.undo()
        if undone is not None:
            out.line(f"  Undone {undone.describe()}: state = {receiver.get_state()}")


example = CommandExample()
