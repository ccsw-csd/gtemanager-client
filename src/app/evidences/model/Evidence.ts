import { Person } from "./Person";

export class Evidence {
    id: number;
    person: Person;
    evidenceW1: number;
    evidenceW2: number;
    evidenceW3: number;
    evidenceW4: number;
    evidenceW5: number;
    evidenceW6: number;

    public constructor(init?:Partial<Evidence>) {
        Object.assign(this, init);
    }
}