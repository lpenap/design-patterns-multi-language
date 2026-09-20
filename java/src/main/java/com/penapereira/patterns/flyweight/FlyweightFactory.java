package com.penapereira.patterns.flyweight;

import java.util.HashMap;
import java.util.Map;

/** Creates flyweights on first request and returns the existing one afterwards. */
public final class FlyweightFactory {

    private final Map<String, Flyweight> pool = new HashMap<>();

    public Flyweight getFlyweight(String key) {
        return pool.computeIfAbsent(key, ConcreteFlyweight::new);
    }

    public int count() {
        return pool.size();
    }
}
