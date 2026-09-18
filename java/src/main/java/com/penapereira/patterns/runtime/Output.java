package com.penapereira.patterns.runtime;

/** The only channel through which an example emits text. */
public interface Output {

    void line(String text);
}
