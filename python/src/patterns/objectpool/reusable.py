class Reusable:
    """The pooled object: expensive to create, cheap to reset.

    It records the task it is assigned to and how many times it has been handed out.
    ``assign`` and ``reset`` are for the pool only.
    """

    def __init__(self, id_: int) -> None:
        self._id = id_
        self._task: str | None = None
        self._uses = 0

    @property
    def id(self) -> int:
        return self._id

    @property
    def task(self) -> str | None:
        """The task this object currently serves, or None while it sits in the pool."""
        return self._task

    @property
    def uses(self) -> int:
        """How many times the pool has handed this object out."""
        return self._uses

    def _assign(self, task: str) -> None:
        self._task = task
        self._uses += 1

    def _reset(self) -> None:
        """Clears the per-use state so the next client starts from a clean object."""
        self._task = None

    def __str__(self) -> str:
        return f"Reusable#{self._id}"
