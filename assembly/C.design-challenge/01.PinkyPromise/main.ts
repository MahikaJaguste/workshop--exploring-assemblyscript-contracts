import { context, logging } from "near-sdk-as";

export function getName(): string {
  logging.log("This is the PinkyPromise design challenge");
  return "PinkyPromise Challenge";
}

export function makeNewPromise(promise_text: string, to: string): void {
  logging.log("The from value is " + context.sender);
}

export function logMyName(): string {
  logging.log("The name value is " + context.sender);
  return context.sender;
}