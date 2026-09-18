from patterns.observer import ConcreteObserver, ConcreteSubject, example
from patterns.runtime.contract import BufferOutput


def test_notifies_every_observer_in_attachment_order() -> None:
    reports: list[str] = []
    subject = ConcreteSubject()
    subject.attach(ConcreteObserver("a", reports.append))
    subject.attach(ConcreteObserver("b", reports.append))
    subject.set_state(1)
    assert reports == ["a notified: state 0 -> 1", "b notified: state 0 -> 1"]
    assert subject.get_state() == 1


def test_a_detached_observer_hears_nothing_further() -> None:
    reports: list[str] = []
    subject = ConcreteSubject()
    a = ConcreteObserver("a", reports.append)
    subject.attach(a)
    subject.set_state(1)
    subject.detach(a)
    subject.set_state(2)
    assert reports == ["a notified: state 0 -> 1"]


def test_an_unchanged_state_notifies_nobody() -> None:
    reports: list[str] = []
    subject = ConcreteSubject()
    subject.attach(ConcreteObserver("a", reports.append))
    subject.set_state(0)
    assert reports == []


def test_any_object_with_update_can_observe() -> None:
    seen: list[tuple[int, int]] = []

    class Recorder:
        def update(self, old_state: int, new_state: int) -> None:
            seen.append((old_state, new_state))

    subject = ConcreteSubject()
    subject.attach(Recorder())
    subject.set_state(3)
    assert seen == [(0, 3)]


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "observer"
    assert out.lines == [
        "Executing Observer Pattern Implementation",
        "  observer1 notified: state 0 -> 5",
        "  observer2 notified: state 0 -> 5",
        "  observer1 notified: state 5 -> 10",
    ]
