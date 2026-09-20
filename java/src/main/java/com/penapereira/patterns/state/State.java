package com.penapereira.patterns.state;

/** The interface for behaviour associated with one state of the Context. */
public interface State {

    void handle(Context context);

    String name();
}
