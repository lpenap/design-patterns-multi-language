import { Handler } from "./handler.js";

export class PositiveHandler extends Handler {
  handle(request) {
    return request > 0 ? "positive" : super.handle(request);
  }
}
