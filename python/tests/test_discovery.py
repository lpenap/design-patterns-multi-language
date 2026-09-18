import pytest

import tests.fixtures
import tests.fixtures_dup
from patterns.runtime.discovery import DuplicateExampleError, discover


def test_discovers_fixtures_sorted_and_skips_packages_without_example() -> None:
    found = discover(tests.fixtures)
    assert list(found) == ["fixture-alpha", "fixture-beta", "fixture-failing"]


def test_production_package_has_no_examples_yet() -> None:
    assert discover() == {}


def test_duplicate_ids_are_rejected() -> None:
    with pytest.raises(DuplicateExampleError, match="duplicate example id: fixture-alpha"):
        discover(tests.fixtures_dup)
