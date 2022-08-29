import { EvidenceType } from "./EvidenceType";
import { Comment } from "./Comment";
import { Person } from "./Person";

export class Evidence {
    // evidence: EvidenceId;
    id: number;
    person: Person;
    comment: Comment;
    evidenteTypeW1: EvidenceType;
    evidenteTypeW2: EvidenceType;
    evidenteTypeW3: EvidenceType;
    evidenteTypeW4: EvidenceType;
    evidenteTypeW5: EvidenceType;
    evidenteTypeW6: EvidenceType;

    public constructor(init?:Partial<Evidence>) {
        Object.assign(this, init);
    }
}