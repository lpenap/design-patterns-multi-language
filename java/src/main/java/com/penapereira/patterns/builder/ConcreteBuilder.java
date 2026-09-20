package com.penapereira.patterns.builder;

/** Assembles the parts into one representation and hands it out. */
public final class ConcreteBuilder implements Builder {

    private final Product product = new Product();

    @Override
    public void buildPartA() {
        product.add("PartA");
    }

    @Override
    public void buildPartB() {
        product.add("PartB");
    }

    @Override
    public Product getResult() {
        return product;
    }
}
