package com.penapereira.patterns.interpreter;

/** Terminal: a variable looked up in the context. */
public final class VariableExpression implements AbstractExpression {

    private final String name;

    public VariableExpression(String name) {
        this.name = name;
    }

    @Override
    public int interpret(Context context) {
        return context.lookup(name);
    }

    @Override
    public String describe() {
        return name;
    }
}
