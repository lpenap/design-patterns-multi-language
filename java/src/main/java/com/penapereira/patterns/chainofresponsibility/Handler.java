package com.penapereira.patterns.chainofresponsibility;

/** Stores the successor and implements the default: forward, or answer "unhandled". */
public abstract class Handler {

    private Handler next;

    /** Links the successor and returns it, so chains read left to right. */
    public Handler setNext(Handler next) {
        this.next = next;
        return next;
    }

    public String handle(int request) {
        return next == null ? "unhandled" : next.handle(request);
    }
}
