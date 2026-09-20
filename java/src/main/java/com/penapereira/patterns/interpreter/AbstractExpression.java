package com.penapereira.patterns.interpreter;

/** A node of the abstract syntax tree. */
public interface AbstractExpression {

    int interpret(Context context);

    String describe();
}
