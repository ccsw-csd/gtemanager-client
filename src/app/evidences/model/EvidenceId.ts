import { Person } from "./Person";

export class EvidenceId {
    id: number;
    person: Person;

    public constructor(init?:Partial<EvidenceId>) {
        Object.assign(this, init);
    }
}