from patterns.memento import Caretaker, Originator


def test_saved_states_are_restored_most_recent_first() -> None:
    originator, caretaker = Originator(), Caretaker()
    originator.set_state("one")
    caretaker.save(originator)
    originator.set_state("two")
    caretaker.save(originator)
    originator.set_state("three")
    assert caretaker.undo(originator) and originator.get_state() == "two"
    assert caretaker.undo(originator) and originator.get_state() == "one"


def test_undo_with_nothing_saved_leaves_the_originator_alone() -> None:
    originator = Originator()
    originator.set_state("x")
    assert not Caretaker().undo(originator)
    assert originator.get_state() == "x"


def test_a_memento_captures_the_value_at_save_time() -> None:
    originator = Originator()
    originator.set_state("before")
    memento = originator.create_memento()
    originator.set_state("after")
    originator.restore(memento)
    assert originator.get_state() == "before"
