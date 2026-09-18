from patterns.runtime.contract import Output


class FixtureFailing:
    id = "fixture-failing"

    def run(self, out: Output) -> None:
        out.line("Executing Fixture Failing Pattern Implementation")
        raise RuntimeError("boom")


example = FixtureFailing()
