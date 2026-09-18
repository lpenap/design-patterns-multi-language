package com.penapereira.patterns.chainofresponsibility;

public final class PositiveHandler extends Handler {

    @Override
    public String handle(int request) {
        return request > 0 ? "positive" : super.handle(request);
    }
}
