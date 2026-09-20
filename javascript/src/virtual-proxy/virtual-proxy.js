// Virtual Proxy: create an expensive object on demand, at the first request.
// A subject is any object with `request()`.

/** The expensive object the proxy stands in for. */
export class RealSubject {
  request() {
    return "RealSubject.request()";
  }
}

/** Creates the real subject on the first request and forwards every request to it. */
export class VirtualProxy {
  #loader;
  #realSubject;

  constructor(loader) {
    this.#loader = loader;
  }

  request() {
    this.#realSubject ??= this.#loader();
    return this.#realSubject.request();
  }

  isLoaded() {
    return this.#realSubject !== undefined;
  }
}
