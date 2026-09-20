package com.penapereira.patterns.builder;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class BuilderTest {

    @Test
    void theDirectorFixesTheSequence() {
        assertEquals("Product(PartA, PartB)", new Director().construct(new ConcreteBuilder()).describe());
    }

    @Test
    void aBuilderAloneProducesOnlyTheRequestedParts() {
        ConcreteBuilder builder = new ConcreteBuilder();
        assertEquals("Product()", builder.getResult().describe());
        builder.buildPartB();
        assertEquals("Product(PartB)", builder.getResult().describe());
    }

    @Test
    void theSameDirectorDrivesADifferentRepresentation() {
        Builder upperCase = new Builder() {
            private final Product product = new Product();

            @Override
            public void buildPartA() {
                product.add("A");
            }

            @Override
            public void buildPartB() {
                product.add("B");
            }

            @Override
            public Product getResult() {
                return product;
            }
        };
        assertEquals("Product(A, B)", new Director().construct(upperCase).describe());
    }
}
