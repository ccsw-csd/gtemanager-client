export class EvidenceError {
    id: number;
    name: string;
    saga: string;
    email: string;
    period: string;
    message: string;
    status: string;

    public constructor(init?:Partial<EvidenceError>) {
        Object.assign(this, init);
    }
}