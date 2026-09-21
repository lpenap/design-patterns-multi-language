import { Handler } from "./handler.js";

export class ZeroHandler extends Handler {
  handle(request) {
    return request === 0 ? "zero" : super.handle(request);
  }
}
