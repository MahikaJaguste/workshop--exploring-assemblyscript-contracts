import { getName, logFromName, makePromise, getMyPromises, setPromiseStatus } from '../main';
import { PinkyPromise, promises_mapping } from '../model';
import {VMContext } from 'near-sdk-as'

describe("PinkyPromise ", () => {

  it("should say challenge name", () => {
    expect(getName()).toBe('PinkyPromise Challenge');
  });

  it("should log name of sender", () => {
    VMContext.setSigner_account_id('alice');
    expect(logFromName()).toStrictEqual('alice');
  });

  it("should create a new promise", () => {
    VMContext.setSigner_account_id('alice');
    const promise_text = 'This is promise one.';
    makePromise(promise_text, 'bob');
    const list_promises = getMyPromises()
    expect(list_promises[0].from).toStrictEqual('alice');
    expect(list_promises[0].to).toStrictEqual('bob');
    expect(list_promises[0].promise_text).toStrictEqual(promise_text);
  })

  it("should create multiple new promises", () => {
    VMContext.setSigner_account_id('alice');
    const promise_text = 'This is promise one.';
    makePromise(promise_text, 'bob');
    const promise_text_1 = 'This is promise two.';
    makePromise(promise_text_1, 'eve');
    const list_promises = getMyPromises();
    expect(list_promises[0].from).toStrictEqual('alice');
    expect(list_promises[0].to).toStrictEqual('bob');
    expect(list_promises[0].promise_text).toStrictEqual(promise_text);
    expect(list_promises[1].from).toStrictEqual('alice');
    expect(list_promises[1].to).toStrictEqual('eve');
    expect(list_promises[1].promise_text).toStrictEqual(promise_text_1);
    expect(list_promises[1].status).toStrictEqual('In progress');
  })

  it("should change promise status", () => {
    VMContext.setSigner_account_id('alice');
    const promise_text = 'This is promise one.';
    makePromise(promise_text, 'bob');
    const promise_text_1 = 'This is promise two.';
    makePromise(promise_text_1, 'eve');
    const promise_text_2 = 'This is promise three.';
    makePromise(promise_text_2, 'eve');
    VMContext.setSigner_account_id('eve');
    setPromiseStatus('alice', 'broken', 1);
    VMContext.setSigner_account_id('alice');
    const list_promises = getMyPromises();
    expect(list_promises[2].from).toStrictEqual('alice');
    expect(list_promises[2].to).toStrictEqual('eve');
    expect(list_promises[2].promise_text).toStrictEqual(promise_text_2);
    expect(list_promises[1].status).toStrictEqual('broken');
  })



});

