import { EvidenceType } from "./EvidenceType";
import { EvidenceId } from "./EvidenceId";
import { Comment } from "./Comment";

export class Evidence {
    evidence: EvidenceId;
    comment: Comment;
    evidenteTypeW1: EvidenceType;
    evidenteTypeW2: EvidenceType;
    evidenceTypeW3: EvidenceType;
    evidenceTypeW4: EvidenceType;
    evidenceTypeW5: EvidenceType;
    evidenceTypeW6: EvidenceType;

    public constructor(init?:Partial<Evidence>) {
        Object.assign(this, init);
    }
}