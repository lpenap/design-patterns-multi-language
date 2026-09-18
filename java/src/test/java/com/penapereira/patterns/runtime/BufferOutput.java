package com.penapereira.patterns.runtime;

import java.util.ArrayList;
import java.util.List;

/** Collects lines in memory for assertions. */
final class BufferOutput implements Output {

    final List<String> lines = new ArrayList<>();

    @Override
    public void line(String text) {
        lines.add(text);
    }
}
