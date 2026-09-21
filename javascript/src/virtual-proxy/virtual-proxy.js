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
