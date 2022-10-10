import { EvidenceType } from "./EvidenceType";
import { Comment } from "./Comment";
import { Person } from "./Person";

export class EvidenceItemList {
    personId: number;
    name: string;
    lastName: string;
    email: string;
    geografia: string;
    comment: Comment;
    evidenceTypeW1: string;
    evidenceTypeW2: string;
    evidenceTypeW3: string;
    evidenceTypeW4: string;
    evidenceTypeW5: string;
    evidenceTypeW6: string;

    public constructor(init?:Partial<EvidenceItemList>) {
        Object.assign(this, init);
    }
}