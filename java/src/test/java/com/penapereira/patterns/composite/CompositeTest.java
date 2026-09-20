package com.penapereira.patterns.composite;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class CompositeTest {

    @Test
    void aLeafRendersItsName() {
        assertEquals("Leaf(X)", new Leaf("X").operation());
    }

    @Test
    void anEmptyCompositeRendersNothingInside() {
        assertEquals("Composite()", new Composite().operation());
    }

    @Test
    void compositesNestToAnyDepth() {
        Component tree = new Composite()
                .add(new Leaf("A"))
                .add(new Composite().add(new Composite().add(new Leaf("B"))));
        assertEquals("Composite(Leaf(A)+Composite(Composite(Leaf(B))))", tree.operation());
    }

    @Test
    void clientCodeIsTheSameForLeafAndComposite() {
        Component[] components = {new Leaf("A"), new Composite().add(new Leaf("A"))};
        assertEquals("Leaf(A)", components[0].operation());
        assertEquals("Composite(Leaf(A))", components[1].operation());
    }
}
