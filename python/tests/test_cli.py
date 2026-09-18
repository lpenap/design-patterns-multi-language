import io
from collections.abc import Mapping

import tests.fixtures
from patterns.runtime.cli import SEPARATOR, USAGE, run
from patterns.runtime.contract import Example, Output
from patterns.runtime.discovery import discover

ALPHA = "Executing Fixture Alpha Pattern Implementation\n  first\n  second\n"
BETA = "Executing Fixture Beta Pattern Implementation\n"
SEP = SEPARATOR + "\n"


def fixtures() -> dict[str, Example]:
    return discover(tests.fixtures)


def call(argv: list[str], examples: Mapping[str, Example]) -> tuple[int, str, str]:
    out, err = io.StringIO(), io.StringIO()
    code = run(argv, out, err, examples)
    return code, out.getvalue(), err.getvalue()


# ---- list (US1) ----


def test_list_prints_sorted_compact_json() -> None:
    assert call(["list"], fixtures()) == (
        0,
        '["fixture-alpha","fixture-beta","fixture-failing"]\n',
        "",
    )


def test_list_of_nothing_prints_empty_array() -> None:
    assert call(["list"], {}) == (0, "[]\n", "")


# ---- run <id> (US2) ----


def test_run_prints_exact_lines() -> None:
    assert call(["run", "fixture-alpha"], fixtures()) == (0, ALPHA, "")


def test_run_unknown_id_exits_two() -> None:
    assert call(["run", "nope"], fixtures()) == (2, "", "unknown example: nope\n")


def test_run_failing_example_leaves_stdout_clean_and_exits_one() -> None:
    assert call(["run", "fixture-failing"], fixtures()) == (
        1,
        "",
        "example failed: fixture-failing: boom\n",
    )


# ---- run --all (US3) ----


def test_run_all_separates_outputs_and_reports_failures() -> None:
    code, out, err = call(["run", "--all"], fixtures())
    assert code == 1
    assert out == ALPHA + SEP + BETA + SEP
    assert err == "example failed: fixture-failing: boom\n"


def test_run_all_succeeds_with_one_separator_between_two_examples() -> None:
    two = {k: v for k, v in fixtures().items() if k != "fixture-failing"}
    assert call(["run", "--all"], two) == (0, ALPHA + SEP + BETA, "")


def test_run_all_with_no_examples_prints_nothing() -> None:
    assert call(["run", "--all"], {}) == (0, "", "")


def test_run_all_with_failing_first_does_not_print_leading_separator() -> None:
    class FailingFirst:
        id = "a-failing"

        def run(self, out: Output) -> None:
            raise ValueError("x")

    examples: dict[str, Example] = {"a-failing": FailingFirst(), **fixtures()}
    del examples["fixture-failing"]
    code, out, err = call(["run", "--all"], examples)
    assert code == 1
    assert out == ALPHA + SEP + BETA
    assert err == "example failed: a-failing: x\n"


# ---- usage ----


def test_usage_on_bad_arguments() -> None:
    for argv in ([], ["bogus"], ["run"], ["list", "extra"]):
        assert call(argv, fixtures()) == (1, "", USAGE + "\n")
