/** The interface common to all algorithms. */
export interface Strategy {
  executeAlgorithm(): string;
}

export class ConcreteStrategyA implements Strategy {
  executeAlgorithm(): string {
    return "--> algorithm from ConcreteStrategyA";
  }
}

export class ConcreteStrategyB implements Strategy {
  executeAlgorithm(): string {
    return "==> algorithm from ConcreteStrategyB";
  }
}

/** Holds a strategy and delegates to it; the strategy can be replaced at run time. */
export class Context {
  constructor(private strategy: Strategy) {}

  operation(): string {
    return `Operation with ${this.strategy.executeAlgorithm()}`;
  }

  setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }
}
