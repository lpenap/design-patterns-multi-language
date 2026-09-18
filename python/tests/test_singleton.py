from patterns.runtime.contract import BufferOutput
from patterns.singleton import Singleton, example


def test_instance_returns_the_same_object_every_time() -> None:
    assert Singleton.instance() is Singleton.instance()


def test_the_instance_does_its_work() -> None:
    assert Singleton.instance().do_something() == "Singleton is doing something"


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "singleton"
    assert out.lines == [
        "Executing Singleton Pattern Implementation",
        "  Same instance returned twice: true",
        "  Singleton is doing something",
    ]
