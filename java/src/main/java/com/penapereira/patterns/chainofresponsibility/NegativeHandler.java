package com.penapereira.patterns.chainofresponsibility;

public final class NegativeHandler extends Handler {

    @Override
    public String handle(int request) {
        return request < 0 ? "negative" : super.handle(request);
    }
}
