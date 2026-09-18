"""Discovers examples by importing every pattern package under ``patterns``."""

import importlib
import pkgutil
from types import ModuleType

import patterns
from patterns.runtime.contract import Example


class DuplicateExampleError(Exception):
    """Two packages expose examples with the same id."""


def discover(package: ModuleType = patterns) -> dict[str, Example]:
    """Import each subpackage of ``package`` and index its ``example`` by id, sorted."""
    found: dict[str, Example] = {}
    for info in pkgutil.iter_modules(package.__path__):
        if info.name == "runtime":
            continue
        module = importlib.import_module(f"{package.__name__}.{info.name}")
        example: Example | None = getattr(module, "example", None)
        if example is None:
            continue
        if example.id in found:
            raise DuplicateExampleError(f"duplicate example id: {example.id}")
        found[example.id] = example
    return dict(sorted(found.items()))
