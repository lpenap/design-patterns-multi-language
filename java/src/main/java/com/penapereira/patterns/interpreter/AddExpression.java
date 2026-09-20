package com.penapereira.patterns.interpreter;

/** Nonterminal: expression '+' expression. */
public final class AddExpression implements AbstractExpression {

    private final AbstractExpression left;
    private final AbstractExpression right;

    public AddExpression(AbstractExpression left, AbstractExpression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret(Context context) {
        return left.interpret(context) + right.interpret(context);
    }

    @Override
    public String describe() {
        return "(" + left.describe() + " + " + right.describe() + ")";
    }
}
