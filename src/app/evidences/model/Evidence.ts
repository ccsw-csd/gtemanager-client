import { EvidenceType } from "./EvidenceType";
import { Comment } from "./Comment";
import { Person } from "./Person";

export class Evidence {
    saga: String;
    id: number;
    person: Person;
    comment: Comment;
    manager: String;
    project: String;
    client: String;
    recurrence: boolean;
    evidenceTypeW1: EvidenceType;
    evidenceTypeW2: EvidenceType;
    evidenceTypeW3: EvidenceType;
    evidenceTypeW4: EvidenceType;
    evidenceTypeW5: EvidenceType;
    evidenceTypeW6: EvidenceType;
    emailNotificationSent: boolean;
    rowColor: String;

    public constructor(init?:Partial<Evidence>) {
        Object.assign(this, init);
    }
}