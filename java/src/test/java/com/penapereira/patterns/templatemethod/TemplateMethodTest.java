package com.penapereira.patterns.templatemethod;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class TemplateMethodTest {

    @Test
    void skeletonComesFromTheBaseAndStepsFromTheSubclass() {
        assertEquals("ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2",
                new ConcreteClassA().templateMethod());
    }

    @Test
    void anOverriddenHookExtendsTheResult() {
        assertEquals("ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook",
                new ConcreteClassB().templateMethod());
    }

    @Test
    void theHookDefaultsToNothing() {
        AbstractClass minimal = new AbstractClass() {
            @Override
            protected String primitiveOperation1() {
                return "one";
            }

            @Override
            protected String primitiveOperation2() {
                return "two";
            }
        };
        assertEquals("one then two", minimal.templateMethod());
    }
}
