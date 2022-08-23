import { Person } from "./Person";

export class Comment {
    id: number;
    person: Person;
    comment: String;

    public constructor(init?:Partial<Comment>) {
        Object.assign(this, init);
    }
}