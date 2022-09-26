export class EvidenceError {
    id: number;
    name: string;
    saga: string;
    email: string;
    period: string;
    error_message: string;

    public constructor(init?:Partial<EvidenceError>) {
        Object.assign(this, init);
    }
}