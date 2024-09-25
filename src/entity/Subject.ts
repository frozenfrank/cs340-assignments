import { Observer } from "./Observer";

export class Subject<T> {
  private observers: Observer<T>[] = [];

  constructor() { }

  attach(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  notify(message: T): void {
    const errors: unknown[] = [];
    this.observers.forEach((observer) => {
      try {
        observer.onMessage(message);
      } catch (error) {
        errors.push(error);
      }
    });

    if (errors.length) {
      console.error("Errors notifying observers", errors)
      throw new Error("Errors notifying observers. First error: " + errors[0]);
    }
  }
}
