from patterns.runtime.contract import Output


class FixtureBeta:
    id = "fixture-beta"

    def run(self, out: Output) -> None:
        out.line("Executing Fixture Beta Pattern Implementation")


example = FixtureBeta()
