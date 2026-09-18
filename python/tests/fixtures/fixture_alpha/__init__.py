from patterns.runtime.contract import Output


class FixtureAlpha:
    id = "fixture-alpha"

    def run(self, out: Output) -> None:
        out.line("Executing Fixture Alpha Pattern Implementation")
        out.line("  first")
        out.line("  second")


example = FixtureAlpha()
