import { Handler } from "./handler.ts";

export class PositiveHandler extends Handler {
  override handle(request: number): string {
    return request > 0 ? "positive" : super.handle(request);
  }
}
