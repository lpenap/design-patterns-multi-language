from __future__ import annotations

from typing import TYPE_CHECKING

from .object_pool import ObjectPool

if TYPE_CHECKING:
    from patterns.runtime.contract import Output

    from .reusable import Reusable


class ObjectPoolExample:
    """The client: acquires objects for tasks, releases them, and never constructs one itself."""

    id = "object-pool"

    def run(self, out: Output) -> None:
        out.line("Executing Object Pool Pattern Implementation")
        pool = ObjectPool(2)
        first = self._acquire(pool, "A", out)
        self._acquire(pool, "B", out)
        self._acquire(pool, "C", out)
        assert first is not None
        pool.release(first)
        out.line(f"  Released {first}")
        self._acquire(pool, "C", out)
        out.line(f"  Created {pool.created} objects for 4 requests")

    @staticmethod
    def _acquire(pool: ObjectPool, task: str, out: Output) -> Reusable | None:
        try:
            reusable = pool.acquire(task)
        except RuntimeError as e:
            out.line(f"  Task {task} -> {e}")
            return None
        out.line(f"  Task {task} -> {reusable} (use {reusable.uses})")
        return reusable


example = ObjectPoolExample()
