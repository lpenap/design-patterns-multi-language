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
