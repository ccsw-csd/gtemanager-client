import { Person } from "./Person";

export class PersonSaga {
    id: number;
    person: Person;
    saga: string;

    public constructor(init?:Partial<PersonSaga>) {
        Object.assign(this, init);
    }
}