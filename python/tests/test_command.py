from patterns.command import ConcreteCommand, Invoker, Receiver


def test_execute_and_undo_act_on_the_receiver() -> None:
    receiver = Receiver()
    command = ConcreteCommand(receiver, "x")
    command.execute()
    assert receiver.get_state() == "x"
    command.undo()
    assert receiver.get_state() == ""
    command.undo()  # nothing left to reverse; harmless
    assert receiver.get_state() == ""
    assert command.describe() == "ConcreteCommand(x)"


def test_the_invoker_undoes_most_recent_first() -> None:
    receiver = Receiver()
    invoker = Invoker()
    invoker.execute(ConcreteCommand(receiver, "a"))
    invoker.execute(ConcreteCommand(receiver, "b"))
    undone = invoker.undo()
    assert undone is not None and undone.describe() == "ConcreteCommand(b)"
    assert receiver.get_state() == "a"
    undone = invoker.undo()
    assert undone is not None and undone.describe() == "ConcreteCommand(a)"
    assert receiver.get_state() == ""


def test_undo_with_an_empty_history_does_nothing() -> None:
    assert Invoker().undo() is None


def test_any_command_works_with_the_invoker() -> None:
    log: list[str] = []

    class Custom:
        def execute(self) -> None:
            log.append("do")

        def undo(self) -> None:
            log.append("undo")

        def describe(self) -> str:
            return "custom"

    invoker = Invoker()
    invoker.execute(Custom())
    invoker.undo()
    assert log == ["do", "undo"]
