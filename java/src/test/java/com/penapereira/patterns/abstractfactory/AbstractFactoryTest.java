package com.penapereira.patterns.abstractfactory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;

import java.util.List;
import org.junit.jupiter.api.Test;

class AbstractFactoryTest {

    /** Client code written against the abstract types only. */
    private static List<String> namesFrom(AbstractFactory factory) {
        return List.of(factory.createProductA().name(), factory.createProductB().name());
    }

    @Test
    void eachFactoryProducesItsOwnFamily() {
        assertEquals(List.of("ProductA1", "ProductB1"), namesFrom(new ConcreteFactory1()));
        assertEquals(List.of("ProductA2", "ProductB2"), namesFrom(new ConcreteFactory2()));
    }

    @Test
    void productsAreOfTheConcreteFamilyClasses() {
        assertInstanceOf(ProductA1.class, new ConcreteFactory1().createProductA());
        assertInstanceOf(ProductB2.class, new ConcreteFactory2().createProductB());
    }
}
