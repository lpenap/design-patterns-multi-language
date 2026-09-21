import type { Strategy } from "./strategy.ts";

export class ConcreteStrategyA implements Strategy {
  executeAlgorithm(): string {
    return "--> algorithm from ConcreteStrategyA";
  }
}
