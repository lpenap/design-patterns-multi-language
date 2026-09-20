package com.penapereira.patterns.interpreter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.NoSuchElementException;
import org.junit.jupiter.api.Test;

class InterpreterTest {

    @Test
    void terminalsInterpretThemselves() {
        Context context = new Context().assign("n", 7);
        assertEquals(4, new NumberExpression(4).interpret(context));
        assertEquals("4", new NumberExpression(4).describe());
        assertEquals(7, new VariableExpression("n").interpret(context));
        assertEquals("n", new VariableExpression("n").describe());
    }

    @Test
    void nonterminalsCombineTheirChildren() {
        Context context = new Context();
        assertEquals(5, new AddExpression(new NumberExpression(2), new NumberExpression(3)).interpret(context));
        assertEquals(-1, new SubtractExpression(new NumberExpression(2), new NumberExpression(3)).interpret(context));
    }

    @Test
    void treesNestToAnyDepth() {
        AbstractExpression deep = new AddExpression(
                new SubtractExpression(new NumberExpression(10), new AddExpression(new NumberExpression(1), new NumberExpression(2))),
                new VariableExpression("z"));
        assertEquals("((10 - (1 + 2)) + z)", deep.describe());
        assertEquals(8, deep.interpret(new Context().assign("z", 1)));
        assertEquals(107, deep.interpret(new Context().assign("z", 100)));
    }

    @Test
    void anUndefinedVariableIsAnError() {
        NoSuchElementException e = assertThrows(NoSuchElementException.class,
                () -> new VariableExpression("q").interpret(new Context()));
        assertEquals("undefined variable: q", e.getMessage());
    }
}
