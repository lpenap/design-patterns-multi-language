package com.penapereira.patterns.nullobject;

import java.util.List;

/** The client: uses its logger unconditionally, never asking whether it is "really there". */
public final class OrderProcessor {

    private final Logger logger;

    public OrderProcessor(Logger logger) {
        this.logger = logger;
    }

    /** Processes every order and returns how many were processed. */
    public int process(List<String> orders) {
        for (String order : orders) {
            logger.log("processing " + order);
        }
        return orders.size();
    }
}
