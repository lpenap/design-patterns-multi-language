import threading
from typing import TYPE_CHECKING

from .bounded_buffer import BoundedBuffer
from .constants import POISON_PILL
from .consumer import Consumer
from .producer import Producer

if TYPE_CHECKING:
    from patterns.runtime.contract import Output


class ProducerConsumerExample:
    """The coordinator: runs one producer and two consumers, then reports what never varies."""

    id = "producer-consumer"

    CAPACITY = 2
    CONSUMERS = 2
    ITEMS = [1, 2, 3, 4, 5]

    def run(self, out: Output) -> None:
        out.line("Executing Producer/Consumer Pattern Implementation")
        out.line(f"  Buffer capacity {self.CAPACITY}, 1 producer, {self.CONSUMERS} consumers")

        buffer: BoundedBuffer[int] = BoundedBuffer(self.CAPACITY)
        consumed: list[int] = []  # list.append is atomic under the GIL
        consumers = [
            threading.Thread(target=Consumer(buffer, consumed).run) for _ in range(self.CONSUMERS)
        ]
        producer = threading.Thread(target=Producer(buffer, self.ITEMS).run)
        for thread in [*consumers, producer]:
            thread.start()

        producer.join()
        for _ in consumers:
            buffer.put(POISON_PILL)
        for thread in consumers:
            thread.join()

        ordered = sorted(consumed)
        out.line(f"  Produced: {' '.join(map(str, self.ITEMS))}")
        out.line(f"  Consumed: {' '.join(map(str, ordered))}")
        out.line(f"  Each item consumed exactly once: {str(ordered == self.ITEMS).lower()}")


example = ProducerConsumerExample()
