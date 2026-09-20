package com.penapereira.patterns.facade;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class FacadeTest {

    @Test
    void facadeDrivesTheSubsystemInOrder() {
        assertEquals("Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC",
                new Facade().operation());
    }

    @Test
    void subsystemClassesRemainUsableDirectly() {
        assertEquals("SubsystemA.operationA", new SubsystemA().operationA());
        assertEquals("SubsystemB.operationB", new SubsystemB().operationB());
        assertEquals("SubsystemC.operationC", new SubsystemC().operationC());
    }
}
