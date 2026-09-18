package com.penapereira.patterns.runtime;

/**
 * A runnable demonstration of one pattern. Implementations are discovered
 * through {@link java.util.ServiceLoader}; the id equals the catalog id.
 */
public interface Example {

    String id();

    void run(Output out) throws Exception;
}
