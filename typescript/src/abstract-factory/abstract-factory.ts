export interface AbstractProductA {
  name(): string;
}

export interface AbstractProductB {
  name(): string;
}

/** Declares one creation operation per abstract product. */
export interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

export class ProductA1 implements AbstractProductA {
  name(): string {
    return "ProductA1";
  }
}

export class ProductA2 implements AbstractProductA {
  name(): string {
    return "ProductA2";
  }
}

export class ProductB1 implements AbstractProductB {
  name(): string {
    return "ProductB1";
  }
}

export class ProductB2 implements AbstractProductB {
  name(): string {
    return "ProductB2";
  }
}

/** Creates the products of family 1. */
export class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ProductA1();
  }

  createProductB(): AbstractProductB {
    return new ProductB1();
  }
}

/** Creates the products of family 2. */
export class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ProductA2();
  }

  createProductB(): AbstractProductB {
    return new ProductB2();
  }
}
