package com.penapereira.patterns.prototype;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotSame;

import org.junit.jupiter.api.Test;

class PrototypeTest {

    @Test
    void aCloneIsADistinctObjectWithEqualState() {
        ConcretePrototype1 original = new ConcretePrototype1("x");
        ConcretePrototype1 clone = original.clone();
        assertNotSame(original, clone);
        assertEquals(original.describe(), clone.describe());
    }

    @Test
    void changingTheCloneLeavesTheOriginalUntouched() {
        ConcretePrototype2 original = new ConcretePrototype2("x");
        ConcretePrototype2 clone = original.clone();
        clone.setState("y");
        assertEquals("ConcretePrototype2(state=x)", original.describe());
        assertEquals("ConcretePrototype2(state=y)", clone.describe());
    }

    @Test
    void cloningThroughTheInterfacePreservesTheConcreteClass() {
        Prototype[] prototypes = {new ConcretePrototype1("a"), new ConcretePrototype2("b")};
        assertInstanceOf(ConcretePrototype1.class, prototypes[0].clone());
        assertInstanceOf(ConcretePrototype2.class, prototypes[1].clone());
    }
}
