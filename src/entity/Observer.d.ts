export interface Observer<T> {
  onMessage(message: T): void;
}
