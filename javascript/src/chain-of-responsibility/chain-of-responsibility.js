// Chain of Responsibility: pass a request along linked handlers until one takes it.

/** Stores the successor and implements the default: forward, or answer "unhandled". */
export class Handler {
  #next;

  /** Links the successor and returns it, so chains read left to right. */
  setNext(handler) {
    this.#next = handler;
    return handler;
  }

  handle(request) {
    return this.#next === undefined ? "unhandled" : this.#next.handle(request);
  }
}

export class NegativeHandler extends Handler {
  handle(request) {
    return request < 0 ? "negative" : super.handle(request);
  }
}

export class ZeroHandler extends Handler {
  handle(request) {
    return request === 0 ? "zero" : super.handle(request);
  }
}

export class PositiveHandler extends Handler {
  handle(request) {
    return request > 0 ? "positive" : super.handle(request);
  }
}
