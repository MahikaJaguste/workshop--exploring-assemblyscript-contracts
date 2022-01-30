import {context, PersistentVector} from 'near-sdk-as';

@nearBindgen
export class PinkyPromise {
    from: string;
    status: string;
    constructor(public promise_text: string, public to: string) {
        this.from = context.sender;
        this.status = 'In progress';
    }
}

export const pinky_promises = new PersistentVector<PinkyPromise>("pp");