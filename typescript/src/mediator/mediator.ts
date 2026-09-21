import type { Colleague } from "./colleague.ts";

/** Defines the interface for communicating with colleagues. */
export interface Mediator {
  notify(sender: Colleague, message: string): void;
}
