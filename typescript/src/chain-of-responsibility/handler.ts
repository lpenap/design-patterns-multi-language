/** Stores the successor and implements the default: forward, or answer "unhandled". */
export abstract class Handler {
  private next: Handler | undefined;

  /** Links the successor and returns it, so chains read left to right. */
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(request: number): string {
    return this.next === undefined ? "unhandled" : this.next.handle(request);
  }
}
