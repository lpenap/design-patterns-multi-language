import type { Component } from "./component.ts";

/** A primitive with no children. */
export class Leaf implements Component {
  constructor(private readonly name: string) {}

  operation(): string {
    return `Leaf(${this.name})`;
  }
}
