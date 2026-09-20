package com.penapereira.patterns.protectionproxy;

import com.penapereira.patterns.runtime.Example;
import com.penapereira.patterns.runtime.Output;

/** The client: makes the same call through proxies carrying different roles. */
public final class ProtectionProxyExample implements Example {

    @Override
    public String id() {
        return "protection-proxy";
    }

    @Override
    public void run(Output out) {
        out.line("Executing Protection Proxy Pattern Implementation");
        Subject real = new RealSubject();
        for (String role : new String[] {"admin", "guest"}) {
            Subject subject = new ProtectionProxy(real, role);
            out.line("  " + role + ": " + subject.request());
        }
    }
}
