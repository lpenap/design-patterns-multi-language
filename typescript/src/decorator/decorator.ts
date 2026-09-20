import type { Component } from "./component.ts";

/** Holds the wrapped component and forwards to it; subclasses add behaviour. */
export abstract class Decorator implements Component {
  constructor(private readonly component: Component) {}

  operation(): string {
    return this.component.operation();
  }
}
