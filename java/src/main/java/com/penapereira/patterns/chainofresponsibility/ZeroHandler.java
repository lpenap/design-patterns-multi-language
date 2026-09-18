package com.penapereira.patterns.chainofresponsibility;

public final class ZeroHandler extends Handler {

    @Override
    public String handle(int request) {
        return request == 0 ? "zero" : super.handle(request);
    }
}
