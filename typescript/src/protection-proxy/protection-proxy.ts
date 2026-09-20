/** The common interface of real subject and proxy. */
export interface Subject {
  request(): string;
}

/** The object the proxy represents. */
export class RealSubject implements Subject {
  request(): string {
    return "RealSubject.request()";
  }
}

/** Checks the caller's role before forwarding to the subject. */
export class ProtectionProxy implements Subject {
  constructor(
    private readonly subject: Subject,
    private readonly role: string,
  ) {}

  request(): string {
    return this.role === "admin" ? this.subject.request() : "access denied by ProtectionProxy";
  }
}
