import { Person } from "./Person";
import { EvidenceType } from "./EvidenceType";

export class Evidence {
    id: number;
    person: Person;
    comments: Comment[];
    evidenceW1: EvidenceType;
    evidenceW2: EvidenceType;
    evidenceW3: EvidenceType;
    evidenceW4: EvidenceType;
    evidenceW5: EvidenceType;
    evidenceW6: EvidenceType;

    public constructor(init?:Partial<Evidence>) {
        Object.assign(this, init);
    }
}