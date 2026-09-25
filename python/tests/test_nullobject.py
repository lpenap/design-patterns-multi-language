from patterns.nullobject import NullLogger, OrderProcessor, OutputLogger
from patterns.runtime.contract import BufferOutput


def test_the_real_logger_writes_every_message() -> None:
    out = BufferOutput()
    logger = OutputLogger(out)
    logger.log("one")
    logger.log("two")
    assert out.lines == ["    [log] one", "    [log] two"]


def test_the_null_logger_does_nothing_and_breaks_nothing() -> None:
    logger = NullLogger()
    logger.log("ignored")
    assert OrderProcessor(logger).process(["a", "b", "c"]) == 3


def test_the_processor_logs_once_unconditionally_per_order() -> None:
    out = BufferOutput()
    processor = OrderProcessor(OutputLogger(out))
    assert processor.process(["x", "y"]) == 2
    assert out.lines == ["    [log] processing x", "    [log] processing y"]
    assert processor.process([]) == 0
    assert len(out.lines) == 2
