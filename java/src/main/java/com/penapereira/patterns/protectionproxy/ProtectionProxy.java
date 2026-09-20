package com.penapereira.patterns.protectionproxy;

/** Checks the caller's role before forwarding to the subject. */
public final class ProtectionProxy implements Subject {

    private final Subject subject;
    private final String role;

    public ProtectionProxy(Subject subject, String role) {
        this.subject = subject;
        this.role = role;
    }

    @Override
    public String request() {
        return "admin".equals(role) ? subject.request() : "access denied by ProtectionProxy";
    }
}
