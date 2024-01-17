import { Person } from "src/app/evidences/model/Person";

export class Blacklist {
    id: number;
    person: Person;
    date: Date;
    comment: string;
    manager: string;
    project: string;
    client: string;
    rowColor: string;

    public constructor(init?:Partial<Blacklist>) {
        Object.assign(this, init);
    }
}