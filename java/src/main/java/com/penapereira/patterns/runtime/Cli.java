package com.penapereira.patterns.runtime;

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;
import java.util.SortedMap;

/**
 * The language CLI protocol: {@code list}, {@code run <id>}, {@code run --all}.
 * Pure function of its arguments so it can be tested with injected streams.
 */
public final class Cli {

    static final String SEPARATOR = "-".repeat(40);
    static final String USAGE = "usage: patterns list | run <id> | run --all";

    private final PrintStream out;
    private final PrintStream err;
    private final SortedMap<String, Example> examples;

    public Cli(PrintStream out, PrintStream err, SortedMap<String, Example> examples) {
        this.out = out;
        this.err = err;
        this.examples = examples;
    }

    /** Runs one command and returns the process exit code (0, 1 or 2). */
    public int run(String... args) {
        if (args.length == 1 && args[0].equals("list")) {
            return list();
        }
        if (args.length == 2 && args[0].equals("run")) {
            return args[1].equals("--all") ? runAll() : runOne(args[1]);
        }
        err.print(USAGE + "\n");
        return 1;
    }

    private int list() {
        StringBuilder json = new StringBuilder("[");
        for (String id : examples.keySet()) {
            if (json.length() > 1) {
                json.append(',');
            }
            json.append('"').append(id.replace("\\", "\\\\").replace("\"", "\\\"")).append('"');
        }
        out.print(json.append("]\n"));
        return 0;
    }

    private int runOne(String id) {
        Example example = examples.get(id);
        if (example == null) {
            err.print("unknown example: " + id + "\n");
            return 2;
        }
        return execute(example) ? 0 : 1;
    }

    private int runAll() {
        boolean allOk = true;
        boolean printedAny = false;
        for (Example example : examples.values()) {
            if (printedAny) {
                out.print(SEPARATOR + "\n");
            }
            boolean ok = execute(example);
            allOk &= ok;
            printedAny |= ok;
        }
        return allOk ? 0 : 1;
    }

    /** Runs the example, printing its lines only if it completes; false on failure. */
    private boolean execute(Example example) {
        List<String> lines = new ArrayList<>();
        try {
            example.run(lines::add);
        } catch (Exception e) {
            err.print("example failed: " + example.id() + ": " + e.getMessage() + "\n");
            return false;
        }
        for (String line : lines) {
            out.print(line + "\n");
        }
        return true;
    }
}
