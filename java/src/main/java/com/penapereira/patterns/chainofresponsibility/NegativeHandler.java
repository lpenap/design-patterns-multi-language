package com.penapereira.patterns.chainofresponsibility;

/** Handles negative requests; passes anything else to the next handler. */
public final class NegativeHandler extends Handler {

    @Override
    public String handle(int request) {
        return request < 0 ? "negative" : super.handle(request);
    }
}
