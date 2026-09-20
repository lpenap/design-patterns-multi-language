import type { Component } from "./component.ts";

/** The object being decorated. */
export class ConcreteComponent implements Component {
  operation(): string {
    return "ConcreteComponent";
  }
}
