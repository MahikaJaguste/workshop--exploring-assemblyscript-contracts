import { context, logging, PersistentVector } from "near-sdk-as";
import { PinkyPromise, promises_mapping } from "./model";

export function getName(): string {
  logging.log("This is the PinkyPromise design challenge");
  return "PinkyPromise Challenge";
}

export function makePromise(promise_text: string, to: string): void {
  logging.log("The from value is " + context.sender + " the to value is " + to + " and the promise text is " + promise_text);
  const new_promise = new PinkyPromise(promise_text, to);
  let list_promises = promises_mapping.get(context.sender);
  if(list_promises){
    list_promises.push(new_promise);
  }
  else {
    list_promises = new PersistentVector<PinkyPromise>('list_pp');
    list_promises.push(new_promise);
  }
  promises_mapping.set(context.sender, list_promises);
}

export function getMyPromises(): PersistentVector<PinkyPromise> {
  let list_promises = promises_mapping.get(context.sender);
  if(!list_promises){
    list_promises = new PersistentVector<PinkyPromise>('list_pp');
  }
  return list_promises;
}

export function setPromiseStatus(from: string, status: string, index: i32): void {
  let list_promises = promises_mapping.get(from);
  let count: i32 = 0;
  if(list_promises){
    for(let i: i32 = 0; i < list_promises.length; i++) {
      if(list_promises[i].to == context.sender) {
        count++;
        if(count == index){
          list_promises[i].status = status;
          break;
        }
      }
    }
    promises_mapping.set(context.sender, list_promises);
  }
}

export function logFromName(): string {
  logging.log("The from value is " + context.sender);
  return context.sender;
}