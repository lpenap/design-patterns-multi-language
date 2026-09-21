import threading
from collections import deque


class BoundedBuffer[T]:
    """A monitor: one lock (inside the Condition) and two wait conditions.

    ``queue.Queue(maxsize)`` is the standard-library equivalent.
    """

    def __init__(self, capacity: int) -> None:
        self._capacity = capacity
        self._items: deque[T] = deque()
        self._lock = threading.Lock()
        self._not_full = threading.Condition(self._lock)
        self._not_empty = threading.Condition(self._lock)

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
        with self._lock:
            return len(self._items)
