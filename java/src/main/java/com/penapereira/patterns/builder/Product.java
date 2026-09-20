package com.penapereira.patterns.builder;

import java.util.ArrayList;
import java.util.List;

/** The complex object under construction. */
public final class Product {

    private final List<String> parts = new ArrayList<>();

    public void add(String part) {
        parts.add(part);
    }

    public String describe() {
        return "Product(" + String.join(", ", parts) + ")";
    }
}
