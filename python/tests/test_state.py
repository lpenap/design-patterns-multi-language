from patterns.runtime.contract import BufferOutput
from patterns.state import ConcreteStateA, Context, example


def test_states_alternate_on_each_request() -> None:
    context = Context(ConcreteStateA())
    assert context.get_state_name() == "ConcreteStateA"
    context.request()
    assert context.get_state_name() == "ConcreteStateB"
    context.request()
    assert context.get_state_name() == "ConcreteStateA"


def test_the_state_decides_the_transition() -> None:
    class Stuck:
        def handle(self, context: Context) -> None:
            pass  # stays where it is

        def name(self) -> str:
            return "Stuck"

    assert Context(Stuck()).request() == "request() handled by Stuck, now in Stuck"


def test_a_state_instance_can_serve_several_contexts() -> None:
    shared = ConcreteStateA()
    one, two = Context(shared), Context(shared)
    one.request()
    assert one.get_state_name() == "ConcreteStateB"
    assert two.get_state_name() == "ConcreteStateA"


def test_example_prints_the_expected_lines() -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "state"
    assert out.lines == [
        "Executing State Pattern Implementation",
        "  Context in ConcreteStateA",
        "  request() handled by ConcreteStateA, now in ConcreteStateB",
        "  request() handled by ConcreteStateB, now in ConcreteStateA",
    ]
