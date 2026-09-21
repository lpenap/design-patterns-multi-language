// Protection Proxy: check the caller's rights before forwarding to the real subject.
// A subject is any object with `request()`.

/** The object the proxy represents. */
export class RealSubject {
  request() {
    return "RealSubject.request()";
  }
}
