package com.penapereira.patterns.interpreter;

/** Terminal: a literal number. */
public final class NumberExpression implements AbstractExpression {

    private final int value;

    public NumberExpression(int value) {
        this.value = value;
    }

    @Override
    public int interpret(Context context) {
        return value;
    }

    @Override
    public String describe() {
        return Integer.toString(value);
    }
}
