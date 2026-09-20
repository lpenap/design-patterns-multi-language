package com.penapereira.patterns.command;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

class CommandExampleTest {

    @Test
    void printsTheExpectedLines() {
        CommandExample example = new CommandExample();
        List<String> lines = new ArrayList<>();
        example.run(lines::add);
        assertEquals("command", example.id());
        assertEquals(List.of("Executing Command Pattern Implementation",
                "  Executed ConcreteCommand(Hello): state = Hello",
                "  Executed ConcreteCommand(World): state = Hello World",
                "  Undone ConcreteCommand(World): state = Hello"), lines);
    }
}
