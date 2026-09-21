package com.penapereira.patterns.chainofresponsibility;

/** Handles positive requests; passes anything else to the next handler. */
public final class PositiveHandler extends Handler {

    @Override
    public String handle(int request) {
        return request > 0 ? "positive" : super.handle(request);
    }
}
