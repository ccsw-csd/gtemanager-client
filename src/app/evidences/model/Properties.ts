export class Properties {
    id: number;
    key: String;
    value: String;

    public constructor(init?:Partial<Properties>) {
        Object.assign(this, init);
    }
}