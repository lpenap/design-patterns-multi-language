// Protection Proxy: check the caller's rights before forwarding to the real subject.
// A subject is any object with `request()`.

/** The object the proxy represents. */
export class RealSubject {
  request() {
    return "RealSubject.request()";
  }
}

/** Checks the caller's role before forwarding to the subject. */
export class ProtectionProxy {
  #subject;
  #role;

  constructor(subject, role) {
    this.#subject = subject;
    this.#role = role;
  }

  request() {
    return this.#role === "admin" ? this.#subject.request() : "access denied by ProtectionProxy";
  }
}
