import {context, PersistentVector, PersistentMap} from 'near-sdk-as';

@nearBindgen
export class PinkyPromise {
    from: string;
    status: string;
    constructor(public promise_text: string, public to: string) {
        this.from = context.sender;
        this.status = 'In progress';
    }
}

export const promises_mapping = new PersistentMap<string, PersistentVector<PinkyPromise>>("p_from");