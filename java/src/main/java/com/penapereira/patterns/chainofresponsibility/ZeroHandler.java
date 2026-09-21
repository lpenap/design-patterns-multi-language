package com.penapereira.patterns.chainofresponsibility;

/** Handles a request of zero; passes anything else to the next handler. */
public final class ZeroHandler extends Handler {

    @Override
    public String handle(int request) {
        return request == 0 ? "zero" : super.handle(request);
    }
}
