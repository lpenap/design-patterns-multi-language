package com.penapereira.patterns.abstractfactory;

/** Declares one creation operation per abstract product. */
public interface AbstractFactory {

    AbstractProductA createProductA();

    AbstractProductB createProductB();
}
