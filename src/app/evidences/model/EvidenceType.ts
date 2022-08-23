export class EvidenceType {
    id: number;
    code: String;
    name: String;

    public constructor(init?:Partial<EvidenceType>) {
        Object.assign(this, init);
    }
}