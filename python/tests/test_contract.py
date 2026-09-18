import io

from patterns.runtime.contract import BufferOutput, ConsoleOutput
from tests.fixtures.fixture_alpha import example as alpha


def test_buffer_output_collects_lines() -> None:
    out = BufferOutput()
    alpha.run(out)
    assert out.lines == ["Executing Fixture Alpha Pattern Implementation", "  first", "  second"]


def test_console_output_terminates_each_line() -> None:
    stream = io.StringIO()
    out = ConsoleOutput(stream)
    out.line("a")
    out.line("b")
    assert stream.getvalue() == "a\nb\n"
