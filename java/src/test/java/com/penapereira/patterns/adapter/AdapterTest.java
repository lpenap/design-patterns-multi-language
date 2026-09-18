package com.penapereira.patterns.adapter;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class AdapterTest {

    @Test
    void translatesRequestIntoSpecificRequest() {
        Target target = new Adapter(new Adaptee());
        assertEquals("Adapter(Adaptee)", target.request());
    }

    @Test
    void delegatesToWhicheverAdapteeItHolds() {
        Adaptee other = new Adaptee() {
            @Override
            public String specificRequest() {
                return "Other";
            }
        };
        assertEquals("Adapter(Other)", new Adapter(other).request());
    }
}
