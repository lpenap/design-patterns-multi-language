from collections import deque

from .reusable import Reusable


class ObjectPool:
    """Lends out up to ``capacity`` reusable objects.

    Each object is created only on first demand; released ones are recycled in FIFO order.
    """

    def __init__(self, capacity: int) -> None:
        if capacity < 1:
            raise ValueError(f"capacity must be positive: {capacity}")
        self._capacity = capacity
        self._available: deque[Reusable] = deque()
        self._in_use: dict[int, Reusable] = {}
        self._created = 0

    def acquire(self, task: str) -> Reusable:
        """Hands out an idle object, or a new one while the pool is below capacity.

        Raises ``RuntimeError`` when every object is in use.
        """
        if self._available:
            reusable = self._available.popleft()
        else:
            if self._created == self._capacity:
                in_use = len(self._in_use)
                raise RuntimeError(f"pool exhausted, {in_use} of {self._capacity} in use")
            self._created += 1
            reusable = Reusable(self._created)
        reusable._assign(task)
        self._in_use[reusable.id] = reusable
        return reusable

    def release(self, reusable: Reusable) -> None:
        """Takes an object back, resets it and makes it available again.

        Raises ``ValueError`` when the object was not lent out by this pool.
        """
        if self._in_use.pop(reusable.id, None) is not reusable:
            raise ValueError(f"{reusable} is not in use")
        reusable._reset()
        self._available.append(reusable)

    @property
    def capacity(self) -> int:
        return self._capacity

    @property
    def created(self) -> int:
        return self._created

    @property
    def available(self) -> int:
        return len(self._available)

    @property
    def in_use(self) -> int:
        return len(self._in_use)
