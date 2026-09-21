import { Handler } from "./handler.ts";

export class NegativeHandler extends Handler {
  override handle(request: number): string {
    return request < 0 ? "negative" : super.handle(request);
  }
}
