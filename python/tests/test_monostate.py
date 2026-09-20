from patterns.monostate import Monostate


def test_instances_are_distinct_objects() -> None:
    assert Monostate() is not Monostate()


def test_a_write_through_one_instance_is_visible_through_all() -> None:
    a, b = Monostate(), Monostate()
    a.set_value(11)
    assert b.get_value() == 11
    b.set_value(22)
    assert a.get_value() == 22


def test_an_instance_created_later_sees_the_shared_state() -> None:
    Monostate().set_value(33)
    assert Monostate().get_value() == 33
