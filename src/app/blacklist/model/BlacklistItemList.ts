export class BlacklistItemList {
    id: number;
    personId: number;
    saga: String
    name: string;
    dateRaw: Date;
    date: string;
    lastName: string;
    email: string;
    geografia: string;
    manager: string;
    project: string;
    client: string;
    comment: string;
    rowColor: string;

    public constructor(init?:Partial<BlacklistItemList>) {
        Object.assign(this, init);
    }
}