import { Handler } from "./handler.js";

export class NegativeHandler extends Handler {
  handle(request) {
    return request < 0 ? "negative" : super.handle(request);
  }
}
