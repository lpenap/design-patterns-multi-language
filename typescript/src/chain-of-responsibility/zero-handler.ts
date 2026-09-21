import { Handler } from "./handler.ts";

export class ZeroHandler extends Handler {
  override handle(request: number): string {
    return request === 0 ? "zero" : super.handle(request);
  }
}
