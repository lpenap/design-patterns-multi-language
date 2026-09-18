package com.penapereira.patterns.runtime;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import org.junit.jupiter.api.Test;

class CliTest {

    private static final String SEP = "-".repeat(40) + "\n";
    private static final String ALPHA =
            "Executing Fixture Alpha Pattern Implementation\n  first\n  second\n";
    private static final String BETA = "Executing Fixture Beta Pattern Implementation\n";

    private final ByteArrayOutputStream outBytes = new ByteArrayOutputStream();
    private final ByteArrayOutputStream errBytes = new ByteArrayOutputStream();
    private final PrintStream out = new PrintStream(outBytes, true, StandardCharsets.UTF_8);
    private final PrintStream err = new PrintStream(errBytes, true, StandardCharsets.UTF_8);

    private static SortedMap<String, Example> fixtures(Example... examples) {
        return Examples.index(List.of(examples));
    }

    private static SortedMap<String, Example> allFixtures() {
        return fixtures(new FixtureAlphaExample(), new FixtureBetaExample(), new FixtureFailingExample());
    }

    private String stdout() {
        return outBytes.toString(StandardCharsets.UTF_8);
    }

    private String stderr() {
        return errBytes.toString(StandardCharsets.UTF_8);
    }

    // ---- list (US1) ----

    @Test
    void listPrintsSortedCompactJson() {
        int code = new Cli(out, err, allFixtures()).run("list");
        assertEquals(0, code);
        assertEquals("[\"fixture-alpha\",\"fixture-beta\",\"fixture-failing\"]\n", stdout());
        assertEquals("", stderr());
    }

    @Test
    void listOfNothingPrintsEmptyArray() {
        int code = new Cli(out, err, new TreeMap<>()).run("list");
        assertEquals(0, code);
        assertEquals("[]\n", stdout());
    }

    @Test
    void listEscapesJsonSpecialCharacters() {
        Example odd = new Example() {
            @Override
            public String id() {
                return "we\"ird\\id";
            }

            @Override
            public void run(Output o) {
            }
        };
        new Cli(out, err, fixtures(odd)).run("list");
        assertEquals("[\"we\\\"ird\\\\id\"]\n", stdout());
    }

    // ---- run <id> (US2) ----

    @Test
    void runPrintsExactLines() {
        int code = new Cli(out, err, allFixtures()).run("run", "fixture-alpha");
        assertEquals(0, code);
        assertEquals(ALPHA, stdout());
        assertEquals("", stderr());
    }

    @Test
    void runUnknownIdExitsTwo() {
        int code = new Cli(out, err, allFixtures()).run("run", "nope");
        assertEquals(2, code);
        assertEquals("", stdout());
        assertEquals("unknown example: nope\n", stderr());
    }

    @Test
    void runFailingExampleLeavesStdoutCleanAndExitsOne() {
        int code = new Cli(out, err, allFixtures()).run("run", "fixture-failing");
        assertEquals(1, code);
        assertEquals("", stdout());
        assertEquals("example failed: fixture-failing: boom\n", stderr());
    }

    // ---- run --all (US3) ----

    @Test
    void runAllSeparatesOutputsAndReportsFailures() {
        int code = new Cli(out, err, allFixtures()).run("run", "--all");
        assertEquals(1, code);
        assertEquals(ALPHA + SEP + BETA + SEP, stdout());
        assertEquals("example failed: fixture-failing: boom\n", stderr());
    }

    @Test
    void runAllSucceedsWithOneSeparatorBetweenTwoExamples() {
        int code = new Cli(out, err, fixtures(new FixtureAlphaExample(), new FixtureBetaExample()))
                .run("run", "--all");
        assertEquals(0, code);
        assertEquals(ALPHA + SEP + BETA, stdout());
        assertEquals("", stderr());
    }

    @Test
    void runAllWithNoExamplesPrintsNothing() {
        int code = new Cli(out, err, new TreeMap<>()).run("run", "--all");
        assertEquals(0, code);
        assertEquals("", stdout());
    }

    @Test
    void runAllWithFailingFirstDoesNotPrintLeadingSeparator() {
        Example failingFirst = new Example() {
            @Override
            public String id() {
                return "a-failing";
            }

            @Override
            public void run(Output o) throws Exception {
                throw new Exception("x");
            }
        };
        int code = new Cli(out, err, fixtures(failingFirst, new FixtureBetaExample())).run("run", "--all");
        assertEquals(1, code);
        assertEquals(BETA, stdout());
    }

    // ---- usage ----

    @Test
    void noArgumentsPrintsUsage() {
        assertEquals(1, new Cli(out, err, allFixtures()).run());
        assertEquals(Cli.USAGE + "\n", stderr());
        assertEquals("", stdout());
    }

    @Test
    void unknownCommandPrintsUsage() {
        assertEquals(1, new Cli(out, err, allFixtures()).run("bogus"));
        assertEquals(1, new Cli(out, err, allFixtures()).run("run"));
        assertEquals(1, new Cli(out, err, allFixtures()).run("list", "extra"));
    }
}
