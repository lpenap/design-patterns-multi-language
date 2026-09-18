"""Producer/Consumer: coordinate producers and consumers through a bounded buffer."""

import threading
from collections import deque
from collections.abc import Sequence

from patterns.runtime.contract import Output

POISON_PILL = -1
"""A sentinel item that tells one consumer to stop."""


class BoundedBuffer[T]:
    """A monitor: one lock (inside the Condition) and two wait conditions.

    ``queue.Queue(maxsize)`` is the standard-library equivalent.
    """

    def __init__(self, capacity: int) -> None:
        self._capacity = capacity
        self._items: deque[T] = deque()
        self._not_full = threading.Condition()
        self._not_empty = threading.Condition(self._not_full)  # same lock

    def put(self, item: T) -> None:
        """Wait while the buffer is full, then append the item."""
        with self._not_full:
            self._not_full.wait_for(lambda: len(self._items) < self._capacity)
            self._items.append(item)
            self._not_empty.notify()

    def take(self) -> T:
        """Wait while the buffer is empty, then remove the oldest item."""
        with self._not_empty:
            self._not_empty.wait_for(lambda: len(self._items) > 0)
            item = self._items.popleft()
            self._not_full.notify()
            return item

    def size(self) -> int:
        with self._not_full:
            return len(self._items)


class Producer:
    """Puts its items into the buffer in order; put() waits while the buffer is full."""

    def __init__(self, buffer: BoundedBuffer[int], items: Sequence[int]) -> None:
        self._buffer = buffer
        self._items = items

    def run(self) -> None:
        for item in self._items:
            self._buffer.put(item)


class Consumer:
    """Takes items until it takes the poison pill; take() waits while the buffer is empty."""

    def __init__(self, buffer: BoundedBuffer[int], consumed: list[int]) -> None:
        self._buffer = buffer
        self._consumed = consumed

    def run(self) -> None:
        while (item := self._buffer.take()) != POISON_PILL:
            self._consumed.append(item)


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
