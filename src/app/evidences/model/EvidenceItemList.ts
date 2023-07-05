import { EvidenceType } from "./EvidenceType";
import { Comment } from "./Comment";
import { Person } from "./Person";

export class EvidenceItemList {
    saga: String
    personId: number;
    name: string;
    lastName: string;
    email: string;
    geografia: string;
    manager: String;
    project: String;
    client: String;
    comment: Comment;
    recurrence: boolean;
    evidenceTypeW1: string;
    evidenceTypeW2: string;
    evidenceTypeW3: string;
    evidenceTypeW4: string;
    evidenceTypeW5: string;
    evidenceTypeW6: string;
    emailNotificationSent: boolean;
    rowColor: String;

    public constructor(init?:Partial<EvidenceItemList>) {
        Object.assign(this, init);
    }
}