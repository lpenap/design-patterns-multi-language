package com.penapereira.patterns.visitor;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class VisitorTest {

    private static ObjectStructure structure() {
        ObjectStructure structure = new ObjectStructure();
        structure.add(new ConcreteElementA());
        structure.add(new ConcreteElementB());
        structure.add(new ConcreteElementA());
        return structure;
    }

    @Test
    void eachElementDispatchesToTheVisitMethodForItsClass() {
        ConcreteVisitor1 visitor = new ConcreteVisitor1();
        new ConcreteElementB().accept(visitor);
        assertEquals("visited ConcreteElementB", visitor.result());
        ConcreteVisitor2 other = new ConcreteVisitor2();
        new ConcreteElementA().accept(other);
        assertEquals("A", other.result());
    }

    @Test
    void visitorsAccumulateOverTheWholeStructure() {
        ConcreteVisitor2 visitor = new ConcreteVisitor2();
        structure().accept(visitor);
        assertEquals("A+B+A", visitor.result());
    }

    @Test
    void anEmptyStructureYieldsAnEmptyResult() {
        ConcreteVisitor1 visitor = new ConcreteVisitor1();
        new ObjectStructure().accept(visitor);
        assertEquals("", visitor.result());
    }

    @Test
    void aNewOperationNeedsNoChangeToTheElements() {
        List<String> counts = new ArrayList<>();
        Visitor counter = new Visitor() {
            @Override
            public void visitConcreteElementA(ConcreteElementA element) {
                counts.add("a");
            }

            @Override
            public void visitConcreteElementB(ConcreteElementB element) {
                counts.add("b");
            }
        };
        structure().accept(counter);
        assertEquals(List.of("a", "b", "a"), counts);
    }
}
