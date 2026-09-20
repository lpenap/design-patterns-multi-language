package com.penapereira.patterns.command;

import java.util.ArrayList;
import java.util.List;

/** Knows how to perform the operations associated with a request. */
public final class Receiver {

    private final List<String> words = new ArrayList<>();

    public void action(String word) {
        words.add(word);
    }

    public void reverse(String word) {
        int last = words.lastIndexOf(word);
        if (last >= 0) {
            words.remove(last);
        }
    }

    public String getState() {
        return String.join(" ", words);
    }
}
