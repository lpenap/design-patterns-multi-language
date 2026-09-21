// Virtual Proxy: create an expensive object on demand, at the first request.
// A subject is any object with `request()`.

/** The expensive object the proxy stands in for. */
export class RealSubject {
  request() {
    return "RealSubject.request()";
  }
}
