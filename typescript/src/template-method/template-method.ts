/** Fixes the algorithm's skeleton; subclasses supply the steps. */
export abstract class AbstractClass {
  /** The skeleton; TypeScript has no `final`, so the order is protected by convention. */
  templateMethod(): string {
    return `${this.primitiveOperation1()} then ${this.primitiveOperation2()}${this.hook()}`;
  }

  protected abstract primitiveOperation1(): string;

  protected abstract primitiveOperation2(): string;

  /** A hook: default behaviour that subclasses may extend. */
  protected hook(): string {
    return "";
  }
}

export class ConcreteClassA extends AbstractClass {
  protected primitiveOperation1(): string {
    return "ConcreteClassA.primitiveOperation1";
  }

  protected primitiveOperation2(): string {
    return "ConcreteClassA.primitiveOperation2";
  }
}

export class ConcreteClassB extends AbstractClass {
  protected primitiveOperation1(): string {
    return "ConcreteClassB.primitiveOperation1";
  }

  protected primitiveOperation2(): string {
    return "ConcreteClassB.primitiveOperation2";
  }

  protected override hook(): string {
    return " with hook";
  }
}
