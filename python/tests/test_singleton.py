from patterns.singleton import Singleton


def test_instance_returns_the_same_object_every_time() -> None:
    assert Singleton.instance() is Singleton.instance()


def test_the_instance_does_its_work() -> None:
    assert Singleton.instance().do_something() == "Singleton is doing something"
