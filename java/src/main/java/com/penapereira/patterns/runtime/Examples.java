package com.penapereira.patterns.runtime;

import java.util.ServiceLoader;
import java.util.SortedMap;
import java.util.TreeMap;

/** Discovers examples and indexes them by id. */
public final class Examples {

    private Examples() {
    }

    /** Discovers every {@link Example} registered through {@code META-INF/services}. */
    public static SortedMap<String, Example> discover() {
        return index(ServiceLoader.load(Example.class));
    }

    /**
     * Indexes the given examples by id in ascending order.
     *
     * @throws IllegalStateException if two examples share an id
     */
    public static SortedMap<String, Example> index(Iterable<? extends Example> examples) {
        SortedMap<String, Example> byId = new TreeMap<>();
        for (Example example : examples) {
            if (byId.putIfAbsent(example.id(), example) != null) {
                throw new IllegalStateException("duplicate example id: " + example.id());
            }
        }
        return byId;
    }
}
