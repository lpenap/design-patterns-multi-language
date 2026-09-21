from typing import TYPE_CHECKING

from .concrete_command import ConcreteCommand
from .invoker import Invoker
from .receiver import Receiver

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


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
