package com.penapereira.patterns.runtime;

import java.util.SortedMap;

/** Process entry point: wires discovery, the standard streams and the exit code. */
public final class Main {

    private Main() {
    }

    public static void main(String[] args) {
        SortedMap<String, Example> examples;
        try {
            examples = Examples.discover();
        } catch (IllegalStateException e) {
            System.err.print(e.getMessage() + "\n");
            System.exit(1);
            return;
        }
        System.exit(new Cli(System.out, System.err, examples).run(args));
    }
}
