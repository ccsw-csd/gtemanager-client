export class EvidenceType {
    id: number;
    code: string;
    name: string;

    public constructor(init?:Partial<EvidenceType>) {
        Object.assign(this, init);
    }
}