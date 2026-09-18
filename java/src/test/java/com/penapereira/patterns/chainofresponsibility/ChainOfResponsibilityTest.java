package com.penapereira.patterns.chainofresponsibility;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class ChainOfResponsibilityTest {

    private static Handler fullChain() {
        Handler head = new NegativeHandler();
        head.setNext(new ZeroHandler()).setNext(new PositiveHandler());
        return head;
    }

    @Test
    void eachRequestIsAnsweredByTheResponsibleHandler() {
        Handler chain = fullChain();
        assertEquals("negative", chain.handle(-5));
        assertEquals("zero", chain.handle(0));
        assertEquals("positive", chain.handle(7));
    }

    @Test
    void aRequestNobodyClaimsFallsOffTheEnd() {
        Handler shortened = new NegativeHandler();
        shortened.setNext(new ZeroHandler());
        assertEquals("unhandled", shortened.handle(1));
        assertEquals("unhandled", new PositiveHandler().handle(-1));
    }

    @Test
    void relinkingChangesWhoAnswers() {
        Handler head = new PositiveHandler();
        assertEquals("unhandled", head.handle(-1));
        head.setNext(new NegativeHandler());
        assertEquals("negative", head.handle(-1));
    }
}
