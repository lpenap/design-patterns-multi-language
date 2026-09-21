from patterns.mediator import (
    Colleague,
    ConcreteColleague1,
    ConcreteColleague2,
    ConcreteMediator,
)


def test_routes_messages_to_the_other_colleague_in_both_directions() -> None:
    mediator = ConcreteMediator()
    one, two = ConcreteColleague1(mediator), ConcreteColleague2(mediator)
    mediator.set_colleague1(one)
    mediator.set_colleague2(two)
    one.send("a")
    one.send("b")
    two.send("c")
    assert two.received() == ["a", "b"]
    assert one.received() == ["c"]


def test_a_message_with_no_partner_registered_is_dropped() -> None:
    mediator = ConcreteMediator()
    lonely = ConcreteColleague1(mediator)
    mediator.set_colleague1(lonely)
    lonely.send("anyone?")
    assert lonely.received() == []


def test_colleagues_talk_only_to_the_mediator() -> None:
    seen: list[str] = []

    class Recording:
        def notify(self, sender: Colleague, message: str) -> None:
            seen.append(f"{sender.name()}:{message}")

    recording = Recording()
    one, two = ConcreteColleague1(recording), ConcreteColleague2(recording)
    one.send("x")
    two.send("y")
    assert seen == ["ConcreteColleague1:x", "ConcreteColleague2:y"]
    assert one.received() == [] and two.received() == []
