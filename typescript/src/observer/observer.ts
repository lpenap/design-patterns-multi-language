/** The notification interface; push model: the change is carried in the call. */
export interface Observer {
  update(oldState: number, newState: number): void;
}
