package com.penapereira.patterns.composite;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/** Stores children and delegates the operation to them; child management lives here (safe variant). */
public final class Composite implements Component {

    private final List<Component> children = new ArrayList<>();

    public Composite add(Component child) {
        children.add(child);
        return this;
    }

    @Override
    public String operation() {
        return "Composite(" + children.stream().map(Component::operation).collect(Collectors.joining("+")) + ")";
    }
}
