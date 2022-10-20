import { Person } from "./Person";

export class Comment {
    id: number;
    person: Person;
    comment: string;
    lastEditDate: Date;
    lastEditAuthor: string;

    public constructor(init?:Partial<Comment>) {
        Object.assign(this, init);
    }
}