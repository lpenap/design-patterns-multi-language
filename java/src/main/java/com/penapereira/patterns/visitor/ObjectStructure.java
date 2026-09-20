package com.penapereira.patterns.visitor;

import java.util.ArrayList;
import java.util.List;

/** Enumerates its elements and lets a visitor visit each. */
public final class ObjectStructure {

    private final List<Element> elements = new ArrayList<>();

    public void add(Element element) {
        elements.add(element);
    }

    public void accept(Visitor visitor) {
        for (Element element : elements) {
            element.accept(visitor);
        }
    }
}
