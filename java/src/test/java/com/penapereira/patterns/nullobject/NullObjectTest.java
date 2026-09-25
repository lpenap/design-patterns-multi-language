package com.penapereira.patterns.nullobject;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class NullObjectTest {

    @Test
    void theRealLoggerWritesEveryMessage() {
        List<String> lines = new ArrayList<>();
        Logger logger = new OutputLogger(lines::add);
        logger.log("one");
        logger.log("two");
        assertEquals(List.of("    [log] one", "    [log] two"), lines);
    }

    @Test
    void theNullLoggerDoesNothingAndBreaksNothing() {
        Logger logger = new NullLogger();
        logger.log("ignored");
        assertEquals(3, new OrderProcessor(logger).process(List.of("a", "b", "c")));
    }

    @Test
    void theProcessorLogsOnceUnconditionallyPerOrder() {
        List<String> lines = new ArrayList<>();
        OrderProcessor processor = new OrderProcessor(new OutputLogger(lines::add));
        assertEquals(2, processor.process(List.of("x", "y")));
        assertEquals(List.of("    [log] processing x", "    [log] processing y"), lines);
        assertEquals(0, processor.process(List.of()));
        assertEquals(2, lines.size());
    }
}
