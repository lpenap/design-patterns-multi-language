/** The common interface of real subject and proxy. */
export interface Subject {
  request(): string;
}

/** The expensive object the proxy stands in for. */
export class RealSubject implements Subject {
  request(): string {
    return "RealSubject.request()";
  }
}

/** Creates the real subject on the first request and forwards every request to it. */
export class VirtualProxy implements Subject {
  private realSubject: Subject | undefined;

  constructor(private readonly loader: () => Subject) {}

  request(): string {
    this.realSubject ??= this.loader();
    return this.realSubject.request();
  }

  isLoaded(): boolean {
    return this.realSubject !== undefined;
  }
}
