import { Context } from "./context.ts";

/** The interface for behaviour associated with one state of the Context. */
export interface State {
  handle(context: Context): void;
  name(): string;
}
