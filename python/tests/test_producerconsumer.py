import threading
import time

import pytest

from patterns.producerconsumer import (
    POISON_PILL,
    BoundedBuffer,
    Consumer,
    Producer,
    example,
)
from patterns.runtime.contract import BufferOutput


def test_is_first_in_first_out() -> None:
    buffer: BoundedBuffer[str] = BoundedBuffer(3)
    buffer.put("a")
    buffer.put("b")
    assert buffer.size() == 2
    assert buffer.take() == "a"
    assert buffer.take() == "b"
    assert buffer.size() == 0


def test_put_waits_while_full_until_a_take() -> None:
    buffer: BoundedBuffer[int] = BoundedBuffer(1)
    buffer.put(1)
    done = threading.Event()

    def produce() -> None:
        buffer.put(2)
        done.set()

    thread = threading.Thread(target=produce)
    thread.start()
    assert not done.wait(0.1), "put must block while the buffer is full"
    assert buffer.take() == 1
    assert done.wait(1.0)
    assert buffer.take() == 2
    thread.join()


def test_take_waits_while_empty_until_a_put() -> None:
    buffer: BoundedBuffer[int] = BoundedBuffer(1)
    taken: list[int] = []
    thread = threading.Thread(target=lambda: taken.append(buffer.take()))
    thread.start()
    time.sleep(0.1)
    assert taken == [], "take must block while the buffer is empty"
    buffer.put(7)
    thread.join(1.0)
    assert taken == [7]


def test_every_item_is_consumed_exactly_once_and_consumers_stop_on_the_poison_pill() -> None:
    buffer: BoundedBuffer[int] = BoundedBuffer(2)
    consumed: list[int] = []
    consumers = [threading.Thread(target=Consumer(buffer, consumed).run) for _ in range(2)]
    producer = threading.Thread(target=Producer(buffer, [10, 20, 30, 40]).run)
    for t in [*consumers, producer]:
        t.start()
    producer.join(2.0)
    buffer.put(POISON_PILL)
    buffer.put(POISON_PILL)
    for t in consumers:
        t.join(2.0)
    assert sorted(consumed) == [10, 20, 30, 40]
    assert buffer.size() == 0


@pytest.mark.parametrize("run", range(5))
def test_example_prints_the_same_lines_on_every_run(run: int) -> None:
    out = BufferOutput()
    example.run(out)
    assert example.id == "producer-consumer"
    assert out.lines == [
        "Executing Producer/Consumer Pattern Implementation",
        "  Buffer capacity 2, 1 producer, 2 consumers",
        "  Produced: 1 2 3 4 5",
        "  Consumed: 1 2 3 4 5",
        "  Each item consumed exactly once: true",
    ]
